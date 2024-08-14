import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  var prisma: ReturnType<typeof prismaClientWithExtensions> | undefined;
}

const prismaClientWithExtensions = () => new PrismaClient().$extends(withAccelerate());

const client = globalThis.prisma || prismaClientWithExtensions();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;