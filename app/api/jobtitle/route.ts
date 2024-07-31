import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const titles = await prisma.jobTitles.findMany();

    return NextResponse.json(titles);
}
