import { NextApiRequest, NextApiResponse } from 'next';
import ConfirmEmailRequestHandler from '../../../lib/server/request/auth/ConfirmEmailRH';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const confirmEmailHandler: ConfirmEmailRequestHandler = new ConfirmEmailRequestHandler();

loggedInHandler.useMethod(RequestMethod.GET, confirmEmailHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handle(request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
