import { NextApiRequest, NextApiResponse } from 'next';
import ForgotPasswordRequestHandler from '../../../lib/server/request/auth/ForgotPassword';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const forgotPasswordHandler: ForgotPasswordRequestHandler = new ForgotPasswordRequestHandler();

databaseConnectionHandler.use(loggedInHandler).use(forgotPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await databaseConnectionHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
