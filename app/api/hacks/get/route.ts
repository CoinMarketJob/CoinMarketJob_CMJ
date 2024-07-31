import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const hacks = await prisma.hacks.findMany();

    return NextResponse.json(hacks);
}
