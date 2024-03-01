import { compare, genSalt, hash } from "bcryptjs";
import { prisma } from "../../../../../prisma/prisma";
import {sign} from "jsonwebtoken";

export const POST = async (req: Request) => {
    const body = await req.json();
    const user = await prisma.user.findUnique({
        where: {email: body.email}
    })

    const access_token = await sign(JSON.stringify(user), process.env.ACCESS_TOKEN as string);
    if (!user) {
        return new Response(JSON.stringify({
            message: "User not Found",
            status: "error"
        }))
    }
    else {
        const passwordMatch = await compare(body.password, user.password);

        if (passwordMatch){
            return new Response(JSON.stringify({
                message: "Successfully login",
                status: "ok",
                token: access_token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }))
        }
        else {
            return new Response(JSON.stringify({
                message: "Password Incorrect",
                status: "error"
            }))
        }
    }
}
