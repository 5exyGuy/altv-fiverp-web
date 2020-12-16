import { Session } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';

export default class ProfileRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = <Session>this.getMeta('session');

        console.log(session);

        response.status(StatusCodes.OK).json({ ...session });
    }
}
