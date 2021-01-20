import { NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod } from '../../../lib/server/request/RequestMethod';
import ProfileRequestHandler from '../../../lib/server/request/user/ProfileRH';
import SessionRequestHandler from '../../../lib/server/request/auth/Session';

const sessionHandler: SessionRequestHandler = new SessionRequestHandler();
const profileHandler: ProfileRequestHandler = new ProfileRequestHandler();
sessionHandler.use(profileHandler);

export default async (request: NextApiRequest, response: NextApiResponse) =>
    await sessionHandler.handleMethod(RequestMethod.GET, request, response);

export const config = {
    api: {
        externalResolver: true,
    },
};
