import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      where: { userId: currentUser?.id },
      include: {
        appliedJobs: {
          include: {
            user: {
              include: {
                profile: true
              }
            },
            Answers: {
              include: {
                question: true
              }
            }
          }
        },
        jobQuestions: true,
      },
    });

    // Hassas bilgileri filtreleme
    const sanitizedJobs = jobs.map(job => ({
      ...job,
      appliedJobs: job.appliedJobs.map(appliedJob => ({
        ...appliedJob,
        user: {
          profile: appliedJob.user.profile
        }
      }))
    }));

    return NextResponse.json(sanitizedJobs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}