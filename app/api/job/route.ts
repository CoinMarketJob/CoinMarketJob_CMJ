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
    visaSponsorship
  } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  var buyedPackage = null;

  if (PackageType == "OneJob") {
    buyedPackage = await prisma.buyedPackage.create({
      data: {
        userId: currentUser.id,
        packageType: PackageType,
        expirationDate: new Date(Date.now()),        
      },
    });
  } else if(PackageType == "FiveJob") {
    buyedPackage = await prisma.buyedPackage.create({
      data: {
        userId: currentUser.id,
        packageType: PackageType       
      },
    });
  }  else if(PackageType == "Monthly") {
    const currentDate: Date = new Date();
    const nextMonthDate: Date = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    buyedPackage = await prisma.buyedPackage.create({
      data: {
        userId: currentUser.id,
        packageType: PackageType,
        expirationDate: nextMonthDate
      },
    });
  }

  if (!buyedPackage) {
    return NextResponse.json({ error: 'Package not authenticated' }, { status: 401 });
  }

  const job = await prisma.job.create({
    data: { 
        userId: currentUser.id,
        logo,
        companyName,
        jobTitle,
        location,
        jobType,
        experienceLevel,
        educationalDegree,
        salaryMin: parseInt(salaryMin),
        salaryMax: parseInt(salaryMax),
        jobDescription,
        visaSponsorship,
        packageId: buyedPackage.id
    },
  });

  return NextResponse.json(job);
}
