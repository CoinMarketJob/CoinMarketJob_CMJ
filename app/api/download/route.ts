import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password !== 'EthCC' || password !== 'OrangeDAO' || password !== 'OutlierVentures' || password !== 'a16z') {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), 'private', 'CmjFiles.zip');

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=CmjFiles.zip',
        'Content-Type': 'application/zip',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}