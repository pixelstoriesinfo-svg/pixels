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
    const categoryId = searchParams.get('category_id');

    let sql = `
      SELECT sc.*, c.name as category_name 
      FROM sub_categories sc
      JOIN categories c ON sc.category_id = c.id
    `;
    const params: any[] = [];

    if (categoryId) {
      sql += ' WHERE sc.category_id = ?';
      params.push(parseInt(categoryId));
    }

    sql += ' ORDER BY sc.name ASC';

    const subCategories = await query(sql, params);
    return NextResponse.json({ success: true, data: subCategories });
  } catch (error) {
    console.error('Error fetching sub-categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sub-categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, category_id } = await request.json();

    if (!name || !category_id) {
      return NextResponse.json(
        { success: false, error: 'Name and category_id are required' },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const result = await query(
      'INSERT INTO sub_categories (category_id, name, slug) VALUES (?, ?, ?)',
      [category_id, name, slug]
    );

    return NextResponse.json({
      success: true,
      data: { id: (result as any).insertId, name, slug, category_id },
    });
  } catch (error) {
    console.error('Error creating sub-category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sub-category' },
      { status: 500 }
    );
  }
}