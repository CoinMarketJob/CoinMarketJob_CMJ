import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb";
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sectionType, title, institution, location, url, from, to, description } = body;

    const profile = await prisma.profile.findUnique({
      where: { userId: currentUser.id },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const newSection = await prisma.profileSection.create({
      data: {
        profileId: profile.id,
        sectionType,
        title,
        institution,
        location,
        url,
        from,
        to,
        description,
      },
    });

    return NextResponse.json(newSection);
  } catch (error) {
    console.error('Error in POST /api/profile/profilesection:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
