/* eslint-disable */
import { uploadFile } from "@/utils/s3Operations";
import { NextRequest, NextResponse } from "next/server";
import { v6 as uuidv6 } from "uuid";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const result = await uploadFile(
      process.env.S3_IMAGE_BUCKET_NAME,
      file,
      uuidv6()
    );
    return NextResponse.json({ url: result.Location });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
