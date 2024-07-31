import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const lives = await prisma.live.findMany();

    return NextResponse.json(lives);
}
