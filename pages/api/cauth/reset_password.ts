import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import ResetPasswordRequestHandler from '../../../lib/server/request/auth/ResetPassword';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const resetPasswordHandler: ResetPasswordRequestHandler = new ResetPasswordRequestHandler();

databaseConnectionHandler.use(loggedInHandler).use(resetPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await databaseConnectionHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
