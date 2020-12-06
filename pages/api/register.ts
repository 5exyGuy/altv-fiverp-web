import { NextApiRequest, NextApiResponse } from 'next';
import RegisterRH from '../../lib/request/auth/RegisterRH';
import { RequestMethod } from '../../lib/request/RequestMethod';

const registrationHandler: RegisterRH = new RegisterRH();

export default async function (request: NextApiRequest, response: NextApiResponse) {
    await registrationHandler.handleMethod(RequestMethod.POST, request, response);
}

export const config = {
    api: {
        externalResolver: true,
    },
};
