import { prisma } from "../../../../../prisma/prisma";
import { genSalt, hash } from "bcryptjs"

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: body.email }
        })

        const saltRounds = 10; // Number of salt rounds (recommended value)
        const salt = await genSalt(saltRounds);

        const hashedPassword = await hash(body.password, salt);

        if (!user) {
            await prisma.user.create(
                {
                    data: {
                        name: body.name,
                        email: body.email,
                        password: hashedPassword
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