/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Dinamik içeriği zorlamak için

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
