import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "User not authenticated" });
  }

  const user = await prisma.settings.findUnique({
    where: { userId: currentUser.id },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(user);
}
