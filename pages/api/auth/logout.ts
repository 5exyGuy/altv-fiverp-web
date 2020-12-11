import { NextApiRequest, NextApiResponse } from 'next';
import LogoutRequestHandler from '../../../lib/server/request/auth/LogoutRH';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';

const logoutHandler: LogoutRequestHandler = new LogoutRequestHandler();

export default function (request: NextApiRequest, response: NextApiResponse) {
    logoutHandler.handleMethod(RequestMethod.POST, request, response);
}

export const config = {
    api: {
        externalResolver: true,
    },
};
