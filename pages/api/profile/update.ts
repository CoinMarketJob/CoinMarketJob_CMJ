import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { name, url, headline, about, profileImage } = req.body;

    const updatedProfile = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        url,
        headline,
        about,
        image: profileImage,
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  } finally {
    await prisma.$disconnect();
  }
}
