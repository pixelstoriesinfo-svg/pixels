import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hasVideos = searchParams.get('hasVideos') === 'true';

    let sql = 'SELECT * FROM categories ORDER BY name ASC';
    const params: any[] = [];

    if (hasVideos) {
      sql = `
        SELECT DISTINCT c.* FROM categories c
        JOIN sub_categories sc ON c.id = sc.category_id
        JOIN albums a ON sc.id = a.sub_category_id
        WHERE EXISTS (SELECT 1 FROM media m WHERE m.album_id = a.id AND m.file_type = 'video')
        ORDER BY c.name ASC
      `;
    }

    const categories = await query(sql, params);
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const result = await query(
      'INSERT INTO categories (name, slug) VALUES (?, ?)',
      [name, slug]
    );

    return NextResponse.json({
      success: true,
      data: { id: (result as any).insertId, name, slug },
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}