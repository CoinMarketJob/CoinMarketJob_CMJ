/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    PackageType,
    logo,
    companyName,
    jobTitle,
    location,
    jobType,
    experienceLevel,
    educationalDegree,
    salaryMin,
    salaryMax,
    jobDescription,
    visaSponsorship,
    questions,
    showSalary,
    single,
    unitSalary,
    locationType,
  } = body;

  var buyedPackage = null;

  const job = await prisma.job.create({
    data: {
      logo,
      companyName,
      jobTitle,
      location,
      jobType,
      experienceLevel,
      educationalDegree,
      salaryMin: parseInt(salaryMin == "" && single != "" ? single : salaryMin),
      salaryMax: parseInt(salaryMax == "" && single != "" ? single : salaryMax),
      salaryShow: showSalary,
      salaryUnit: unitSalary,
      locationType,
      jobDescription,
      jobQuestions: {
        create: questions.map((question: string) => ({
          question,
        })),
      },
    },
    include: {
      jobQuestions: true,
    },
  });

  return NextResponse.json(job);
}
