import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { jobId: number } }
) {
  const applications = await prisma.applicationsState.findMany({
    where: { jobId: params.jobId },
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
