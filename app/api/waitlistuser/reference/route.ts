import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, referenceMail } = body;

        // Email doğrulama
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Email'in veritabanında zaten mevcut olup olmadığını kontrol edin
        const existingUser = await prisma.waitListUsers.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        // Yeni kullanıcı oluşturma
        const user = await prisma.waitListUsers.create({
            data: {
                email,
                referenceMail
            }
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.log('Error creating user:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}