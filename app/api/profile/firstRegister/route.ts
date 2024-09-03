import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, surname, phoneCode, phoneNumber } = body;

    // Update or create profile
    const profile = await prisma.profile.create({
      data: {
        userId: userId,
        nameSurname: name + " " + surname,

        sectionsOrder: "{1,2,3,4,5,6,7,8}"
      },
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}