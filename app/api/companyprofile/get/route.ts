/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Dinamik içeriği zorlamak için

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const profile = await prisma.companyProfile.findUnique({
    where: { userId: currentUser?.id },
    include: { socialMedias: true },
  });

  return NextResponse.json(profile);
}
