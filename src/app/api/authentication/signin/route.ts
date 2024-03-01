import { prisma } from "../../../../../prisma/prisma";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export const POST = async (req: Request, res: NextApiResponse) => {
    const body = await req.json();
    const user = await prisma.user.findUnique({
        where: {email: body.email}
    })

    const access_token = await jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN as string);

    if (!user) {
        return new Response(JSON.stringify({
            message: "User not Found",
            status: "error"
        }))
    }
    else {
        if (body.password == user.password){
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
