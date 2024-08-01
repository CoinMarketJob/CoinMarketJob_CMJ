/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { uploadFile } from "@/utils/s3Operations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {  
  const body = await request.json();
  const { 
    jobId,
    name,
    surname,
    email,
    phoneCode,
    phone,
    resumeDraft, 
    coverLetterDraft,
    resumeLink,
    coverLetterLink,
    visaSponsorship 
  } = body;


  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const appliedJob = await prisma.appliedJobs.create({
    data: {
        userId: currentUser.id,
        jobId: parseInt(jobId,10),
        name,
        surname,
        email,
        phoneCode,
        phone,
        resumeLink,     
        resumeDraft,
        coverLetterLink,
        coverLetterDraft,   
        visaSponsorship
    },
  });


  return NextResponse.json(appliedJob);
}
