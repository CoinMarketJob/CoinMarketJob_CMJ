/* eslint-disable */
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: { email: "merenkirkas@gmail.com" }
    });


  return NextResponse.json(user);
}
