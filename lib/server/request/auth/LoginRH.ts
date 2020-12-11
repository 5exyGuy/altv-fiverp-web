import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Session, TokenType } from '../Session';
import Database from '../../database/Database';

export default class LoginRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        if (await Session.instance.isLoggedIn(request)) return response.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);

        const { username, password, rememberMe } = request.body;

        if (!username || !password) return response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

        try {
            const user = await Database.instance.PrismaClient.user.findFirst({
                where: { username: { equals: username } },
            });
            if (!user) return response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

            if (!(await bcrypt.compare(password, user.password)))
                return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }

        try {
            const refreshToken: string = await Session.instance.generateRefreshToken({ username }, rememberMe);
            const accessToken: string = await Session.instance.generateAccessToken({ username });

            await Database.instance.PrismaClient.user.update({
                where: { username: username },
                data: { refreshToken: refreshToken },
            });

            // TODO: For some reason it doesn't set the cookie. Must be fixed.
            Session.instance.addCookie(TokenType.Refresh, refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 60,
            });
            Session.instance.addCookie(TokenType.Access, accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 60,
            });
            Session.instance.setCookies(response);

            // response.setHeader('Set-Cookie', [
            //     cookie.serialize(process.env.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            //         httpOnly: true,
            //         maxAge: 60 * 60,
            //     }),
            //     cookie.serialize(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
            //         httpOnly: true,
            //         maxAge: 60 * 60,
            //     }),
            // ]);

            response.status(StatusCodes.OK).json({ username });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }
    }
}
