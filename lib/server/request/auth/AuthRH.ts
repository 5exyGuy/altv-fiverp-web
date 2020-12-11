import RequestHandler from '../RequestHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, TokenType } from '../Session';

export default class AuthRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const [accessToken, refreshToken] = Session.instance.getTokensFormCookies(request);

        if (!accessToken || !refreshToken) return response.json({ error: 'Token is missing' });

        try {
            const payload: object = await Session.instance.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            response.json({ username: (<any>payload).username });
        } catch (error) {
            if (error.name !== 'TokenExpiredError') return response.json({ error: 'Invalid token' });

            try {
                const payload: object = await Session.instance.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newAccessToken: string = await Session.instance.generateAccessToken({
                    username: (<any>payload).username,
                });
                Session.instance.removeCookies();
                Session.instance.addCookie(TokenType.Access, newAccessToken);
                response.json({ username: (<any>payload).username });
                // super.next(request, response);
            } catch (error) {
                if (error.name !== 'TokenExpiredError') return response.json({ error: 'Session expired' });
                response.json({ error: 'Invalid token' });
            }
        }
    }
}
