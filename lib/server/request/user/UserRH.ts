import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export default class LoginRequestHandler extends RequestHandler<void> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        // try {
        //     prisma.user.findFirst({ where: {username: }})
        // } catch (error) {}
    }
}
