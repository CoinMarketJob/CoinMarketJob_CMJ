/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, headline, siteUrl, about, logoLink, socialMedias } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const updatedProfile = await prisma.companyProfile.upsert({
      where: {
        userId: currentUser.id,
      },
      update: {
        logoURL: logoLink,
        companyName,
        headline,
        siteUrl,
        about,
      },
      create: {
        userId: currentUser.id,
        logoURL: logoLink,
        companyName,
        headline,
        siteUrl,
        about,
      },
      include: {
        socialMedias: true,
      },
    });

    await prisma.socialMediaCompany.deleteMany({
      where: { profileId: updatedProfile.id },
    });
    await prisma.socialMediaCompany.createMany({
      data: socialMedias.map((sm: any) => ({ ...sm, profileId: updatedProfile.id })),
    });

    const fullUpdatedProfile = await prisma.companyProfile.findUnique({
      where: { id: updatedProfile.id },
      include: { socialMedias: true },
    });

    return NextResponse.json(fullUpdatedProfile);
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
