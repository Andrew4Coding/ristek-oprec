import { prisma } from "../../../../../prisma/prisma";
import { getSalt } from "bcryptjs"

export async function POST(req: Request) {
    try {
        const body = await req.json();
    
        const user = await prisma.user.findUnique({
            where: {email: body.email}
        })
        

        if (!user) {
            await prisma.user.create(
                {
                    data: {
                        ...body,
                    }
                }
            )
    
            return new Response(JSON.stringify({
                message: "User created succesfully",
                status: "ok",
                user: body.email
            }))
        }
        else {
            return new Response(JSON.stringify({
                message: "User already Exist",
                status: "error",
            }))
        }
    }
    catch (error) {
        return new Response(JSON.stringify({
            message: "Failed to signup",
            status: "error",
            error: error
        }))
    }

    
}