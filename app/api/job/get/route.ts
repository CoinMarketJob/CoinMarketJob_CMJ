import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const jobs = await prisma.job.findMany();

    return NextResponse.json(jobs);
}
