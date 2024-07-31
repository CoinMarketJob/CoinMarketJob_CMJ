import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { type, url, profileId } = body;

  const socialMedia = await prisma.socialMedia.create({
    data: {
        profileId,
        socialMediaType: type,
        socialMediaUrl: url
    }
  });

  return NextResponse.json(socialMedia);
}
