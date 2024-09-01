import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  const jobId = parseInt(params.jobId, 10);

  if (isNaN(jobId)) {
    return NextResponse.json({ error: "Invalid jobId" }, { status: 400 });
  }

  const applications = await prisma.applicationsState.findMany({
    where: { jobId },
    include: {
      appliedJobs: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      },
    },
  });

  return NextResponse.json(applications);
}
