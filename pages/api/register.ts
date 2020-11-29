import { NextApiRequest, NextApiResponse } from 'next';
import RegisterRequestHandler from '../../lib/request/auth/RegisterRequestHandler';
import ConnectionRequestHandler from '../../lib/request/database/ConnectionRequestHandler';
import { RequestMethod } from '../../lib/request/RequestMethod';

const connectionHandler: ConnectionRequestHandler = new ConnectionRequestHandler();
const registrationHandler: RegisterRequestHandler = new RegisterRequestHandler();

connectionHandler.use(registrationHandler);

export default async function (request: NextApiRequest, response: NextApiResponse) {
    await connectionHandler.handleMethod(RequestMethod.POST, request, response);
}
