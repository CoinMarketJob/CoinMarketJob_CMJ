import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "User not authenticated" });
  }

  const user = await prisma.settings.findUnique({
    where: { userId: currentUser.id },
  });

  return NextResponse.json(user);
}
