/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const titles = await prisma.jobTitles.findMany({
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(titles);
}
