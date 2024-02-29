import { prisma } from "../../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
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

        const deletePromise = await prisma.transaction.delete({
            where: {
                id: parseInt(body.id)
            }
        })

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Database query takes too long!"))
            }, 1)
        })

        const result = await Promise.race([deletePromise, timeoutPromise])

        return new NextResponse(JSON.stringify({
            message: 'Successfully delete the transaction',
            status: 'ok',
            result: result,
        }))
    }
    catch (e) {
        return new NextResponse(JSON.stringify({
            message: 'Something went wrong',
            status: 'error',
            error: e
        }))
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        await prisma.transaction.update({
            where: {
                id: body.id
            },
            data: {
                ...body
            }
        })

        return new NextResponse(JSON.stringify({
            message: 'Successfully edit transactions',
            status: 'ok',
            body: body
        }))
    }
    catch(e) {
        return new NextResponse(JSON.stringify({
            message: 'error',
            status: 'error',
            error: e
        }))
    }
}