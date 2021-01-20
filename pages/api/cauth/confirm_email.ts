import { NextApiRequest, NextApiResponse } from 'next';
import ConfirmEmailRequestHandler from '../../../lib/server/request/auth/ConfirmEmail';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const confirmEmailHandler: ConfirmEmailRequestHandler = new ConfirmEmailRequestHandler();

loggedInHandler.use(confirmEmailHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handleMethod(RequestMethod.GET, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
