/* eslint-disable */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    
    const currentUser = await getCurrentUser();
    const jobs = await prisma.savedJobs.findMany(
        {
            where: {userId: currentUser.id},
            include: {job: true}
        }
    );

    return NextResponse.json(jobs);
}
