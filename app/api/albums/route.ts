import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getMediaUrl } from '@/lib/upload';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const categoryId = searchParams.get('categoryId');
    const type = searchParams.get('type');
    const brand = searchParams.get('brand');

    const brandFilter = brand ? `%${brand}%` : '%';
    const limitVal = limit ? parseInt(limit) : 50;
    
    let sql = `
      SELECT a.id, a.name, a.sub_category_id, a.created_at,
             sc.name as sub_category_name, c.name as category_name,
             (SELECT file_name FROM media WHERE album_id = a.id AND file_type = 'image' ORDER BY order_index ASC LIMIT 1) as cover_image,
             (SELECT COUNT(*) FROM media WHERE album_id = a.id AND file_type = 'image') as media_count,
             (SELECT COUNT(*) FROM media WHERE album_id = a.id AND file_type = 'video') as video_count
      FROM albums a
      JOIN sub_categories sc ON a.sub_category_id = sc.id
      JOIN categories c ON sc.category_id = c.id
      WHERE c.name LIKE ?
    `;
    const params: any[] = [brandFilter];

    if (categoryId) {
      sql += ` AND c.id = ?`;
      params.push(parseInt(categoryId));
    }

    if (type) {
      sql += ` AND EXISTS (SELECT 1 FROM media WHERE album_id = a.id AND file_type = ?)`;
      params.push(type);
    }

    sql += ` ORDER BY a.created_at DESC LIMIT ${limitVal}`;

    const rows = await query(sql, params);
    const albums = rows as any[];

    const albumsWithUrls = albums.map((album) => ({
      ...album,
      cover_image: album.cover_image ? getMediaUrl(album.cover_image) : null,
    }));

    return NextResponse.json({ success: true, data: albumsWithUrls });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sub_category_id } = body;

    if (!name || !sub_category_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO albums (name, sub_category_id) VALUES (?, ?)',
      [name, sub_category_id]
    );

    return NextResponse.json({ success: true, data: { id: (result as any).insertId } });
  } catch (error) {
    console.error('Error creating album:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create album' },
      { status: 500 }
    );
  }
}