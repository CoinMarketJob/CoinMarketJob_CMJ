/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    jobId
  } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const job = await prisma.savedJobs.create({
    data: {
        userId: currentUser.id,
        jobId: jobId
    },
  });


  return NextResponse.json(job);
}
