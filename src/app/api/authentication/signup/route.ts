import { sign } from "jsonwebtoken";
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
            const newUser = await prisma.user.create(
                {
                    data: {
                        name: body.name,
                        email: body.email,
                        password: hashedPassword
                    }
                }
            )

            const access_token = await sign(JSON.stringify(newUser), process.env.ACCESS_TOKEN as string);

            return new Response(JSON.stringify({
                message: "Sign Up Sucessfull",
                status: "ok",
                token: access_token,
                user: newUser
            }))
        }
        else {
            return new Response(JSON.stringify({
                message: "User already registered! Please use Sign In instead.",
                status: "error",
            }))
        }
    }
    catch (error) {
        return new Response(JSON.stringify({
            message: "Failed while Signing Up",
            status: "error",
            error: error
        }))
    }


}