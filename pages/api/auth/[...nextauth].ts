import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from '@/libs/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

interface User {
  id: string; // Ensure ID type matches what is returned by Prisma (string if Prisma ID is string)
  email: string;
  // Include other properties if needed
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid email or password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid email or password');
        }

        const comparePassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!comparePassword) {
          throw new Error('Invalid email or password');
        }

        // Ensure the user object returned conforms to the expected User type
        return {
          id: user.id.toString(), // Convert ID to string if necessary
          email: user.email,
          // Map other properties if needed
        } as User;
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt"
  },
  secret: "@CMJ2024"
};

export default NextAuth(authOptions);
