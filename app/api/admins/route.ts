import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const admins = await query(
      'SELECT id, name, email, created_at FROM admins ORDER BY id ASC'
    );

    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, captchaToken } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const captchaResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: captchaToken,
      }),
    });

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    try {
      const result = await query(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      return NextResponse.json({
        success: true,
        data: { id: (result as any).insertId, name, email },
      });
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { success: false, error: 'Admin with this email already exists' },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
