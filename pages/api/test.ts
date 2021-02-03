import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../lib/server/database/models';
import Database from '../../lib/server/database/Database';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    Database.getInstance().connect();
    const characters = await User.relatedQuery('characters').for(10);
    const apartments = await characters[0].$relatedQuery('apartments');
    response.json({ apartments });
};
