/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const news = await prisma.news.findMany();

    return NextResponse.json(news);
}
