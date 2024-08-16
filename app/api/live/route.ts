/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const lives = await prisma.live.findMany({
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(lives);
}
