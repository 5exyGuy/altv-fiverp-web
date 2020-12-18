import { NextApiRequest, NextApiResponse } from 'next';
import ForgotPasswordRequestHandler from '../../../lib/server/request/auth/ForgotPasswordRH';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const forgotPasswordHandler: ForgotPasswordRequestHandler = new ForgotPasswordRequestHandler();

loggedInHandler.useMethod(RequestMethod.GET, forgotPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    loggedInHandler.handle(request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
