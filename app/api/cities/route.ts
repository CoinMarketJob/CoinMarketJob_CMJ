import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const cities = await prisma.cities.findMany();

    return NextResponse.json(cities);
}
