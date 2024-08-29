import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      where: { userId: currentUser?.id },
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    return NextResponse.json(jobs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server Error" }, { status: 404 });
  }
}
