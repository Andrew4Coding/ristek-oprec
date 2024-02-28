import { prisma } from "../../../prisma/prisma";

export async function GET() {
    return new Response("HELLO WORLD");
}