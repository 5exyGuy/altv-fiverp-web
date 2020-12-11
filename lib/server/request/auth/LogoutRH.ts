import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Session, TokenType } from '../Session';
import Database from '../../database/Database';

export default class LogoutRequestHandler extends RequestHandler<void> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        // Checking if the user is logged in
        const payload: object = await Session.instance.isLoggedIn(request);
        if (!payload) return response.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
        // Removing tokens from the cookies
        Session.instance.addCookie(TokenType.Refresh, '', { httpOnly: true, expires: new Date(0) });
        Session.instance.addCookie(TokenType.Access, '', { httpOnly: true, expires: new Date(0) });
        Session.instance.setCookies(response);

        try {
            await Database.instance.PrismaClient.user.update({
                where: { username: (<any>payload).username },
                data: { refreshToken: null },
            });
            return response.status(StatusCodes.OK).json({});
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
        }
    }
}
