import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, Session } from 'next-auth/client';
import { AuthenticationTranslations } from '../../../../translations/Authentication';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class SessionRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const session: Session = await getSession({ req: request });

        if (session) {
            this.setNextHandlerMeta('session', session);
            await super.next(request, response);
        }
        response
            .status(StatusCodes.UNAUTHORIZED)
            .json(JsonMessage.convert(AuthenticationTranslations.NOT_AUTHORIZED, MessageType.WARNING));
    }
}
