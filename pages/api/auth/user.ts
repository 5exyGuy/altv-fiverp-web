import { NextApiRequest, NextApiResponse } from 'next';
import AuthRequestHandler from '../../../lib/server/request/auth/AuthRH';

const authHandler: AuthRequestHandler = new AuthRequestHandler();

export default function (request: NextApiRequest, response: NextApiResponse) {
    authHandler.handle(request, response);
}

export const config = {
    api: {
        externalResolver: true,
    },
};
