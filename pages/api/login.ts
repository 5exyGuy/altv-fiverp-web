import { NextApiRequest, NextApiResponse } from 'next';
import LoginRequestHandler from '../../services/request/auth/LoginRequestHandler';
import { RequestMethod } from '../../services/request/RequestMethod';

const loginHandler: LoginRequestHandler = new LoginRequestHandler();

export default function (request: NextApiRequest, response: NextApiResponse) {
    loginHandler.handleMethod(RequestMethod.GET, request, response);
}
