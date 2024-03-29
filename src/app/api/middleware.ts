import { verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const middleware = (handler: (req: NextRequest, userId: string) => Promise<Response>) => {
    return async (req: NextRequest) => {
        try {
            const headers = req.headers;
            const token = headers.get("authorization")


            if (!token) {
                return new Response(JSON.stringify({
                    message: "Unauthorized!"
                }))
            }


            const decoded = verify(token, process.env.ACCESS_TOKEN as string);

            const userId = (decoded as { id: string });

            return handler(req, userId.id);
        } catch (error) {
            return new Response(JSON.stringify({
                message: "Error while tokenizing!",
                error: error
            }))
        }
    };
};