import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.profileSection.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Profile section deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile section:", error);
    return NextResponse.json({ error: "Failed to delete profile section" }, { status: 500 });
  }
}