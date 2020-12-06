import { NextApiRequest, NextApiResponse } from 'next';
import LoginRequestHandler from '../../lib/request/auth/LoginRH';
import { RequestMethod } from '../../lib/request/RequestMethod';

const loginHandler: LoginRequestHandler = new LoginRequestHandler();

export default function (request: NextApiRequest, response: NextApiResponse) {
    loginHandler.handleMethod(RequestMethod.POST, request, response);
}

export const config = {
    api: {
        externalResolver: true,
    },
};
