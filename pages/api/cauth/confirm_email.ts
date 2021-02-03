import { NextApiRequest, NextApiResponse } from 'next';
import ConfirmEmailRequestHandler from '../../../lib/server/request/auth/ConfirmEmail';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const confirmEmailHandler: ConfirmEmailRequestHandler = new ConfirmEmailRequestHandler();

loggedInHandler.use(databaseConnectionHandler).use(confirmEmailHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await databaseConnectionHandler.handleMethod(RequestMethod.POST, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
