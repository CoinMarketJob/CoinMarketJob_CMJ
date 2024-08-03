/* eslint-disable */

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const jobs = await prisma.job.findMany();
    
        return NextResponse.json(jobs);
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server Error' }, { status: 404 })
    }
}
