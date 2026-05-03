import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, hashPassword, generateToken } from '@/lib/auth';

async function ensureDefaultAdmin() {
  try {
    const hashed = await hashPassword('Admin@123');
    await query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, name = ?',
      ['Admin', 'admin@example.com', hashed, hashed, 'Admin']
    );
  } catch (error) {
    console.error('Error ensuring default admin:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await ensureDefaultAdmin();

    const admins = await query(
      'SELECT id, name, email, password FROM admins WHERE email = ?',
      [email]
    );

    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const admin = (admins as any[])[0];
    const isValid = await verifyPassword(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: parseInt(admin.id, 10),
      email: admin.email,
      name: admin.name,
    });

    const response = NextResponse.json({ success: true, data: { name: admin.name } });
    response.cookies.set('admin_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
