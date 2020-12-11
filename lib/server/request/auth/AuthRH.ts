import RequestHandler from '../RequestHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, TokenType } from '../Session';
import { UndefinedUser, User } from '../../../shared/types/User';
import { StatusCodes } from 'http-status-codes';

export default class AuthRequestHandler extends RequestHandler<User> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<User> {
        const [accessToken, refreshToken] = Session.instance.getTokensFormCookies(request);

        if (!accessToken || !refreshToken) {
            response.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token is missing' });
            return UndefinedUser;
        }

        try {
            const payload: object = await Session.instance.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            response.json({ username: (<any>payload).username });
        } catch (error) {
            if (error.name !== 'TokenExpiredError') {
                response.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
                return UndefinedUser;
            }

            try {
                const payload: User = <User>await Session.instance.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newAccessToken: string = await Session.instance.generateAccessToken({
                    username: payload.username,
                    role: payload.username,
                });
                Session.instance.removeCookies();
                Session.instance.addCookie(TokenType.Access, newAccessToken);
                response.json({ username: payload.username, role: payload.role });
                return { username: payload.username, role: payload.role };
                // super.next(request, response);
            } catch (error) {
                if (error.name !== 'TokenExpiredError') response.status(StatusCodes.UNAUTHORIZED).json({ error: 'Session expired' });
                else response.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
                return UndefinedUser;
            }
        }
    }
}
