import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const [albumsResult] = await query('SELECT COUNT(*) as count FROM albums');
    const [adminsResult] = await query('SELECT COUNT(*) as count FROM admins');

    return NextResponse.json({
      success: true,
      data: {
        totalAlbums: (albumsResult as any)?.count || 0,
        totalAdmins: (adminsResult as any)?.count || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
