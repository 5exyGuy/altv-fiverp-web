import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserProfile, UndefinedUser } from '../../../shared/types/User';
import Database from '../../database/Database';
import RequestHandler from '../RequestHandler';
import { Session } from '../NextSession';

export default class ProfileRequestHandler extends RequestHandler<UserProfile> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<UserProfile> {
        const [accessToken] = Session.instance.getTokensFormCookies(request);

        try {
            const payload = await Session.instance.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await Database.instance.PrismaClient.user.findFirst({ where: { username: { equals: payload.username } } });
            response.status(StatusCodes.OK).json({ email: user.email, registrationDate: user.registrationDate });
            return { email: user.email, registrationDate: user.registrationDate };
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
            return UndefinedUser;
        }
    }
}
