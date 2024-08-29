import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nameSurname, jobTitle, headline, location, siteUrl, about, socialMedias, sections, avatar } = body;

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId: currentUser.id },
      update: {
        nameSurname,
        jobTitle,
        headline,
        location,
        siteUrl,
        about,
        logoURL: avatar,
      },
      create: {
        userId: currentUser.id,
        nameSurname,
        jobTitle,
        headline,
        location,
        siteUrl,
        about,
        logoURL: avatar,
        sectionsOrder: "{1,2,3,4,5,6,7,8}"
      },
    });

    // Update social media
    await prisma.socialMedia.deleteMany({ where: { profileId: profile.id } });
    await prisma.socialMedia.createMany({
      data: socialMedias.map((sm: any) => ({ ...sm, profileId: profile.id })),
    });

    // Update sections
    await prisma.profileSection.deleteMany({ where: { profileId: profile.id } });
    await prisma.profileSection.createMany({
      data: sections.map((section: any) => ({ ...section, profileId: profile.id })),
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}