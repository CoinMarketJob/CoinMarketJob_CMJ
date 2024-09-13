/* eslint-disable */

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        id: 'desc'  // Bu satır işleri ID'ye göre azalan sırada sıralayacak
      },
      cacheStrategy: { swr: 60, ttl: 60 }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
