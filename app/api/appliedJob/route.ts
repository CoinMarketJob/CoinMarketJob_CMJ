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
    visaSponsorship,
    answers,
  } = body;

  const appliedJob = await prisma.appliedJobs.create({
    data: {
      jobId: parseInt(jobId, 10),
      name,
      surname,
      email,
      phoneCode,
      phone,
      resumeLink,
      resumeDraft,
      Answers: {
        create: answers.map(
          (answer: { questionId: number; answer: string }) => ({
            questionId: answer.questionId,
            answer: answer.answer,
          })
        ),
      },
    },
  });

  return NextResponse.json(appliedJob);
}
