/* eslint-disable */

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      cacheStrategy: { swr: 60, ttl: 60 }
    });

    return NextResponse.json(jobs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server Error" }, { status: 404 });
  }
}
