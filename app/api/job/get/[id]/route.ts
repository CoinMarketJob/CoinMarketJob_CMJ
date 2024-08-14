/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id, 10) },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(job);
}
