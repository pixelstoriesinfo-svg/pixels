import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getMediaUrl } from '@/lib/upload';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    const albums = await query(
      `SELECT a.id, a.name, sc.name as sub_category_name, c.name as category_name, c.slug as category_slug
       FROM albums a
       JOIN sub_categories sc ON a.sub_category_id = sc.id
       JOIN categories c ON sc.category_id = c.id
       WHERE a.id = ?`,
      [albumId]
    );

    if ((albums as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Album not found' },
        { status: 404 }
      );
    }

    const media = await query(
      'SELECT id, file_name, file_type, order_index FROM media WHERE album_id = ? ORDER BY order_index ASC, id ASC',
      [albumId]
    );

    const mediaWithUrls = (media as any[]).map((item) => ({
      ...item,
      url: getMediaUrl(item.file_name),
    }));

    return NextResponse.json({
      success: true,
      data: {
        ...(albums as any[])[0],
        media: mediaWithUrls,
      },
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch album' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    await query('DELETE FROM albums WHERE id = ?', [albumId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete album' },
      { status: 500 }
    );
  }
}
