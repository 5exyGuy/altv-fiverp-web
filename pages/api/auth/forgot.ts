import { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {};

export const config = {
    api: {
        externalResolver: true,
    },
};
