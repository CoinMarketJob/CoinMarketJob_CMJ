import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { state: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { state } = params;

  let whereClause = {};
  if (state !== "All") {
    whereClause = { state };
  }

  const applications = await prisma.applicationsState.findMany({
    where: {
      userId: currentUser.id,
      ...whereClause,
    },
    include: {
      job: true,
      appliedJobs: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          Answers: {
            include: {
              question: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(applications);
}