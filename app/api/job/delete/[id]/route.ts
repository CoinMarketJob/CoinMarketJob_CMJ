/* eslint-disable */
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";



export async function DELETE(
   request: Request, {params} : {params: {id : string}}
) {

    const job = await prisma.job.delete({
        where: {
            id: parseInt(params.id,10)
        }
    })
    return NextResponse.json(job)
}