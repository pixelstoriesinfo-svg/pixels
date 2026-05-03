import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getMediaUrl } from '@/lib/upload';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const categoryId = searchParams.get('categoryId');

    let sql = `
      SELECT a.id, a.name, a.sub_category_id, a.created_at,
             sc.name as sub_category_name, c.name as category_name,
             (SELECT file_name FROM media WHERE album_id = a.id AND file_type = 'video' ORDER BY order_index ASC LIMIT 1) as cover_image,
             (SELECT COUNT(*) FROM media WHERE album_id = a.id AND file_type = 'video') as media_count
      FROM albums a
      JOIN sub_categories sc ON a.sub_category_id = sc.id
      JOIN categories c ON sc.category_id = c.id
      WHERE EXISTS (SELECT 1 FROM media WHERE album_id = a.id AND file_type = 'video')
    `;
    const params: any[] = [];

    if (categoryId) {
      sql += ` AND c.id = ?`;
      params.push(parseInt(categoryId));
    }

    sql += ` ORDER BY a.created_at DESC`;

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(parseInt(limit));
    }

    const albums = await query(sql, params);

    const albumsWithUrls = (albums as any[]).map((album) => ({
      ...album,
      cover_image: album.cover_image ? getMediaUrl(album.cover_image) : null,
    }));

    return NextResponse.json({ success: true, data: albumsWithUrls });
  } catch (error) {
    console.error('Error fetching video albums:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch video albums' },
      { status: 500 }
    );
  }
}