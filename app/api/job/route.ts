/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { LocationType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

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

    // Parse salary values
    const parsedSalaryMin = single ? parseInt(single) : parseInt(salaryMin);
    const parsedSalaryMax = single ? parseInt(single) : parseInt(salaryMax);

    // Handle locationType
    let parsedLocationType: LocationType | null = null;
    if (locationType && locationType !== "") {
      const upperLocationType = locationType.toUpperCase();
      if (Object.values(LocationType).includes(upperLocationType as LocationType)) {
        parsedLocationType = upperLocationType as LocationType;
      }
    }

    console.log("Parsed data:", {
      logo,
      companyName,
      jobTitle,
      location,
      jobType,
      experienceLevel,
      educationalDegree,
      parsedSalaryMin,
      parsedSalaryMax,
      showSalary,
      unitSalary,
      parsedLocationType,
      jobDescription,
      questions,
    });

    const job = await prisma.job.create({
      data: {
        logo,
        companyName,
        jobTitle,
        location,
        jobType: jobType || null,
        experienceLevel: experienceLevel || null,
        educationalDegree: educationalDegree || null,
        salaryMin: isNaN(parsedSalaryMin) ? null : parsedSalaryMin,
        salaryMax: isNaN(parsedSalaryMax) ? null : parsedSalaryMax,
        salaryShow: showSalary,
        salaryUnit: unitSalary,
        locationType: parsedLocationType,
        jobDescription,
        jobQuestions: {
          create: questions.map((question: string) => ({ question })),
        },
      },
      include: {
        jobQuestions: true,
      },
    });

    console.log("Created job:", job);
    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error in job creation:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
