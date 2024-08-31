import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET requests
  return NextResponse.json({ message: 'This is a GET request' });
}

export async function POST(request: Request) {
  // Handle POST requests
  const body = await request.json();
  return NextResponse.json({ message: 'This is a POST request', data: body });
}
