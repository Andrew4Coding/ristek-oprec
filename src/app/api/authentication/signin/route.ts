import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.findUnique({
        where: {email: body.email}
    })

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