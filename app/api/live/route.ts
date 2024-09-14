/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const lives = await prisma.live.findMany({
    select: {
      id: true,
      title: true,
      liveType: true,
      organisation: true,
      headline: true,
      content: true,
      author: true,
      date: true,
      location: true,
      prizePool: true,
      participants: true,
      url: true,
    },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(lives);
}
