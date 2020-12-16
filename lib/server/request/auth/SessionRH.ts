import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, Session } from 'next-auth/client';
import RequestHandler from '../RequestHandler';

export default class SessionRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = await getSession({ req: request });

        if (session) {
            this.setNextHandlerMeta('session', session);
            super.next(request, response);
        } else response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
    }
}
