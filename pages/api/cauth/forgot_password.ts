import { NextApiRequest, NextApiResponse } from 'next';
import ForgotPasswordRequestHandler from '../../../lib/server/request/auth/ForgotPasswordRH';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const forgotPasswordHandler: ForgotPasswordRequestHandler = new ForgotPasswordRequestHandler();

loggedInHandler.use(forgotPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
