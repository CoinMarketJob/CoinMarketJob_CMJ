/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { uploadFile } from "@/utils/s3Operations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { jobId, applicationId, state } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const application = await prisma.applicationsState.create({
    data: {
      userId: currentUser.id,
      jobId,
      applicationId,
      state,
    },
  });

  return NextResponse.json(application);
}
