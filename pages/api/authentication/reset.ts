import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import ResetPasswordRequestHandler from '../../../lib/server/request/auth/ResetPasswordRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const resetPasswordHandler: ResetPasswordRequestHandler = new ResetPasswordRequestHandler();

loggedInHandler.useMethod(RequestMethod.GET, resetPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    loggedInHandler.handle(request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
