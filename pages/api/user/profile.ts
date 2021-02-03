import { NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';
import ProfileRequestHandler from '../../../lib/server/request/user/Profile';
import SessionRequestHandler from '../../../lib/server/request/auth/Session';
import DatabaseConnectionRequestHandler from '../../../lib/server/request/database/DatabaseConnection';

const databaseConnectionHandler: DatabaseConnectionRequestHandler = new DatabaseConnectionRequestHandler();
const sessionHandler: SessionRequestHandler = new SessionRequestHandler();
const profileHandler: ProfileRequestHandler = new ProfileRequestHandler();
databaseConnectionHandler.use(sessionHandler).use(profileHandler);

export default async (request: NextApiRequest, response: NextApiResponse) =>
    await databaseConnectionHandler.handleMethod(RequestMethod.POST, request, response);

export const config = {
    api: {
        externalResolver: true,
    },
};
