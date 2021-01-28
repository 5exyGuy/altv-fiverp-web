import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import ValidResetPasswordRequestHandler from '../../../lib/server/request/auth/ValidResetPassword';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const validResetPasswordHandler: ValidResetPasswordRequestHandler = new ValidResetPasswordRequestHandler();

databaseConnectionHandler.use(loggedInHandler).use(validResetPasswordHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await databaseConnectionHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
