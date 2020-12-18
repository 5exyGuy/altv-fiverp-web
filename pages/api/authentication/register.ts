import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import RegisterRequestHandler from '../../../lib/server/request/auth/RegisterRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const registerHandler: RegisterRequestHandler = new RegisterRequestHandler();

loggedInHandler.useMethod(RequestMethod.POST, registerHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handle(request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
