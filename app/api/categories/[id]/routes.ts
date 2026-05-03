import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { deleteFromR2 } from '@/lib/r2';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    const subCategories = await query(
      'SELECT id FROM sub_categories WHERE category_id = ?',
      [categoryId]
    );

    const subCategoryIds = (subCategories as any[]).map(sc => sc.id);

    if (subCategoryIds.length > 0) {
      const placeholders = subCategoryIds.map(() => '?').join(',');
      const albums = await query(
        `SELECT id FROM albums WHERE sub_category_id IN (${placeholders})`,
        subCategoryIds
      );

      const albumIds = (albums as any[]).map(a => a.id);

      if (albumIds.length > 0) {
        const mediaPlaceholders = albumIds.map(() => '?').join(',');
        const mediaFiles = await query(
          `SELECT file_name FROM media WHERE album_id IN (${mediaPlaceholders})`,
          albumIds
        );

        const filePaths = (mediaFiles as any[]).map(m => m.file_name);
        await Promise.all(filePaths.map(path => deleteFromR2(path)));

        await query(`DELETE FROM media WHERE album_id IN (${mediaPlaceholders})`, albumIds);
        await query(`DELETE FROM albums WHERE id IN (${mediaPlaceholders})`, albumIds);
      }

      await query(`DELETE FROM sub_categories WHERE id IN (${placeholders})`, subCategoryIds);
    }

    await query('DELETE FROM categories WHERE id = ?', [categoryId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
