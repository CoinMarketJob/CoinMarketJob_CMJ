import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    profileId,
    sectionType,
    title,
    from,
    to,
    institution,
    location,
    description,
  } = body;

  const section = await prisma.profileSection.create({
    data: {
      profileId,
      sectionType,
      title,
      from,
      to,
      institution,
      location,
      description,
    },
  });

  return NextResponse.json(section);
}
