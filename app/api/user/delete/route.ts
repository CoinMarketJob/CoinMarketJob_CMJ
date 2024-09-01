/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "User not authenticated" });
  }

  const user = await prisma.user.delete({
    where: { email: currentUser.email },
  });

  return NextResponse.json(user);
}
