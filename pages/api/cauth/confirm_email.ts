import { NextApiRequest, NextApiResponse } from 'next';
import ConfirmEmailRequestHandler from '../../../lib/server/request/auth/ConfirmEmail';
import LoggedInRequestHandler from '../../../lib/server/request/auth/LoggedIn';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const loggedInHandler: LoggedInRequestHandler = new LoggedInRequestHandler();
const confirmEmailHandler: ConfirmEmailRequestHandler = new ConfirmEmailRequestHandler();

databaseConnectionHandler.use(loggedInHandler).use(confirmEmailHandler);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await databaseConnectionHandler.handleMethod(RequestMethod.GET, request, response);
};

export const config = {
    api: {
        externalResolver: true,
    },
};
