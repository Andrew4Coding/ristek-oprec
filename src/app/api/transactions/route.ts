import { prisma } from "../../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

import { middleware } from "../middleware";

export const GET = middleware(async (req: NextRequest, userId: string) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId)
            }
        })

        return new Response(JSON.stringify({
            message: 'GET User Transactions Successfull',
            authorization: "Authorized!",
            status: 'ok',
            transactions: transactions,
            id: userId
        }))


    }
    catch (error) {
        return new Response(JSON.stringify({
            message: 'Failed while getting the user data!',
            status: 'error',
            error: error
        }))
    }
})

export const POST = middleware(async (req: NextRequest, userId: string) => {
    try {
        const body = await req.json();

        await prisma.transaction.create({
            data: {
                ...body,
                userId: parseInt(userId),
            }
        })

        return new NextResponse(JSON.stringify({
            message: 'Create new transaction successfull!',
            status: 'ok',
        }))
    }
    catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed while posting new transaction',
            status: 'error',
            error: error,
        }))
    }
})

export const DELETE = middleware(async (req: Request) => {
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
            message: 'Delete transaction successfull!',
            status: 'ok',
            result: result,
        }))
    }
    catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed while deleting transaction',
            status: 'error',
            error: error
        }))
    }
})

export const PUT = middleware(async (req: Request) => {
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
            message: 'Edit transaction successfull!',
            status: 'ok',
            body: body
        }))
    }
    catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed while editing transaction',
            status: 'error',
            error: error
        }))
    }
})