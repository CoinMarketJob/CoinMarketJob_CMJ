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

    const updatedProfile = await prisma.profile.update({
      where: { userId: currentUser.id },
      data: {
        nameSurname,
        jobTitle,
        headline,
        location,
        siteUrl,
        about,
        logoURL: avatar,
      },
      include: { socialMedias: true, section: true },  // Include related data
    });

    // Update social media
    await prisma.socialMedia.deleteMany({ where: { profileId: updatedProfile.id } });
    await prisma.socialMedia.createMany({
      data: socialMedias.map((sm: any) => ({ ...sm, profileId: updatedProfile.id })),
    });

    // Update sections
    await prisma.profileSection.deleteMany({ where: { profileId: updatedProfile.id } });
    await prisma.profileSection.createMany({
      data: sections.map((section: any) => ({ ...section, profileId: updatedProfile.id })),
    });

    // Fetch the updated profile with all related data
    const fullUpdatedProfile = await prisma.profile.findUnique({
      where: { id: updatedProfile.id },
      include: { socialMedias: true, section: true },
    });

    return NextResponse.json(fullUpdatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}