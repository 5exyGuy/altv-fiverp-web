import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedInRH';
import ValidResetPasswordRequestHandler from '../../../lib/server/request/auth/ValidResetPasswordRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const validResetPasswordHandler: ValidResetPasswordRequestHandler = new ValidResetPasswordRequestHandler();

loggedInHandler.use(validResetPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
