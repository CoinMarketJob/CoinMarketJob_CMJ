import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const cities = await prisma.cities.findMany({
    cacheStrategy: { swr: 60, ttl: 60 }
  });

  return NextResponse.json(cities);
}
