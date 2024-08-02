/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    email
  } = body;

  const user = await prisma.user.findUnique({
    where: { email }
    });


  return NextResponse.json(user);
}