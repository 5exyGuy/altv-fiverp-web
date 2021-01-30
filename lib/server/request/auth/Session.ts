import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, Session } from 'next-auth/client';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';
import ConfirmEmailRequestHandler from './ConfirmEmail';

export default class SessionRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = await getSession({ req: request });

        if (session) {
            this.setNextHandlerMeta('session', session);
            super.next(request, response);
        }
        ConfirmEmailRequestHandler;
        response
            .status(StatusCodes.UNAUTHORIZED)
            .json(JsonMessage.convert('Jūs neturite teisių tai atlikti!.', MessageType.WARNING));
    }
}
