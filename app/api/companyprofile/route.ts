/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { companyName, headline, siteUrl, about, logoLink } = body;

  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const profile = await prisma.companyProfile.update({
    where: {
        userId: currentUser.id,
    },
    data: {
        logoURL: logoLink,
        companyName,
        headline,
        siteUrl,
        about
    },
  })

  return NextResponse.json(profile);
}