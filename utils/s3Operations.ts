import { Upload } from "@aws-sdk/lib-storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

export async function uploadFile(
  BucketName: string | undefined,
  file: File,
  key: string
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    },
  });

  try {
    const response = await upload.done();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function getFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    return response.Body;
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
}
