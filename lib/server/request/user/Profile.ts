import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth/client';
import RequestHandler from '../RequestHandler';

export default class ProfileRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = <Session>this.getMeta('session');

        response.status(StatusCodes.OK).json({ ...session });
    }
}
