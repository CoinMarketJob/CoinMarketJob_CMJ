import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: "AKIAQNUGTZA4KLR5A6MG",
    secretAccessKey: "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",
  },
});

export default s3Client;
