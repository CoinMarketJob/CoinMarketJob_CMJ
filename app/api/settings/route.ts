import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        jobAlerts,
        shouldKnow,
        updates,
        frequency
    } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const setting = await prisma.settings.upsert({
        where: { userId: currentUser.id },
        update: { jobAlert: !jobAlerts, shouldKnow: !shouldKnow, updates: !updates, frequency },
        create: { userId: currentUser.id, theme: "System", jobAlert: !jobAlerts, shouldKnow: !shouldKnow, updates: !updates, frequency },
    })


    return NextResponse.json(setting);
}
