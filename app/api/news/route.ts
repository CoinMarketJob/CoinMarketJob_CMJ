/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {
    LOGO,
    Summary
    } = body;

    const news = await prisma.news.create({
    data: {
        LOGO,
        Summary
    },
    });


    return NextResponse.json(news);
}
