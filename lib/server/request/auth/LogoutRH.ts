import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { Session, TokenType } from '../Session';

const prisma: PrismaClient = new PrismaClient();

export default class LogoutRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const payload: object = await Session.instance.isLoggedIn(request);
        if (!payload) return response.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
        // Removing tokens from the cookies
        Session.instance.addCookie(TokenType.Refresh, '', { httpOnly: true, expires: new Date(0) });
        Session.instance.addCookie(TokenType.Access, '', { httpOnly: true, expires: new Date(0) });
        Session.instance.setCookies(response);

        try {
            await prisma.user.update({ where: { username: (<any>payload).username }, data: { refreshToken: null } });
            response.json({});
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }
    }
}
