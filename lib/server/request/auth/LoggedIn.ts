import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, Session } from 'next-auth/client';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class LoggedInRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = await getSession({ req: request });

        if (session)
            response
                .status(StatusCodes.FORBIDDEN)
                .json(JsonMessage.convert('Jau esate prisijungęs!', MessageType.ERROR));
        else {
            this.setNextHandlerMeta('session', session);
            super.next(request, response);
        }
    }
}
