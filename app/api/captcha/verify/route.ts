import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Captcha token is required' },
        { status: 400 }
      );
    }

    const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Captcha verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify captcha' },
      { status: 500 }
    );
  }
}
