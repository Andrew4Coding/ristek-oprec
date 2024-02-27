import { NextApiRequest } from "next";
import { prisma } from "../../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    try {
        const body = await req.body;
    
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: 1
            }
        })
    
        return new Response(JSON.stringify({
            message: 'Successfully get the user transactions',
            status: 'ok',
            transactions: transactions,
        }))
    }
    catch (err) {
        return new Response(JSON.stringify({
            message: 'Failed!',
            error: 'error'
        }))
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await prisma.transaction.create({
            data: {
                ...body
            }
        })

        return new NextResponse(JSON.stringify({
            message: 'Successfully create transactions',
            status: 'ok',
            body: body
        }))
    }
    catch(e) {
        return new NextResponse(JSON.stringify({
            message: 'error',
            status: 'error'
        }))
    }
}

export async function DELETE(req: Request) {
    
    try {
        const body = await req.json();

        await prisma.transaction.delete({
            where: {
                id: body.id
            }
        })

        return new NextResponse(JSON.stringify({
            message: 'Successfully delete the transaction',
            status: 'ok',
        }))
    }
    catch (e) {
        return new NextResponse(JSON.stringify({
            message: 'Something went wrong',
            status: 'error',
        }))
    }
}
