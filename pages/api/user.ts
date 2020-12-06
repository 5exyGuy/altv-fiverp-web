import { NextApiRequest, NextApiResponse } from 'next';
import AuthRequestHandler from '../../lib/request/auth/AuthRH';
import { RequestMethod } from '../../lib/request/RequestMethod';

const authHandler: AuthRequestHandler = new AuthRequestHandler();

export default function (request: NextApiRequest, response: NextApiResponse) {
    authHandler.handleMethod(RequestMethod.POST, request, response);
}

export const config = {
    api: {
        externalResolver: true,
    },
};
