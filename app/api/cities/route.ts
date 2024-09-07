import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Dinamik içeriği zorlamak için

export async function GET() {

  const profile = await prisma.cities.findMany({
    cacheStrategy: {swr: 60, ttl: 60}
  });

  return NextResponse.json(profile);
}
