import RequestHandler from '../RequestHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Session } from '../../authentication/Session';
import cookie from 'cookie';

export default class AuthRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const cookies: { [key: string]: string } = cookie.parse(request.headers.cookie || '');
        const refreshToken: string = cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];
        const accessToken: string = cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];

        if (!accessToken || !refreshToken)
            return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);

        try {
            await Session.instance.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            if (error?.name !== 'TokenExpiredError')
                return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);

            try {
                await Session.instance.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                super.next(request, response);
            } catch (error) {
                response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
            }
        }
    }
}
