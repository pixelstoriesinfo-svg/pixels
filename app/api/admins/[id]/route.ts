import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const adminCount = await query('SELECT COUNT(*) as count FROM admins');
    const count = (adminCount as any[])[0]?.count || 0;

    if (count <= 1) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete the last admin. At least one admin must exist.' },
        { status: 400 }
      );
    }

    const result = await query('DELETE FROM admins WHERE id = ?', [id]);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
