import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/libs/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

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
          ...user,
          id: user.id.toString() // Convert the id to string
        };
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  debug: true,
  session: {
    strategy: "jwt"
  },
  secret: "@CMJ2024"
};

export default NextAuth(authOptions);
