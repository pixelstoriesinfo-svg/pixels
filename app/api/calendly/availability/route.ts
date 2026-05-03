import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventTypeUri = searchParams.get('eventTypeUri');

  if (!eventTypeUri) {
    return NextResponse.json({ error: 'eventTypeUri is required' }, { status: 400 });
  }

  const now = new Date();
  const startTime = new Date(now.getTime() + 60 * 60 * 1000);
  startTime.setMinutes(0, 0, 0);
  
  const endTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);

  try {
    const response = await fetch(
      `https://api.calendly.com/event_type_available_times?event_type=${eventTypeUri}&start_time=${startTime.toISOString()}&end_time=${endTime.toISOString()}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message || 'Failed to fetch availability' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}