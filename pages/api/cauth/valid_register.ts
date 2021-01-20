import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import ValidRegisterRequestHandler from '../../../lib/server/request/auth/ValidRegister';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const validRegisterHandler: ValidRegisterRequestHandler = new ValidRegisterRequestHandler();

loggedInHandler.use(validRegisterHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await loggedInHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
