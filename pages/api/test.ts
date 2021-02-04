import { NextApiRequest, NextApiResponse } from 'next';
import { Character, User } from '../../lib/server/database/entities';
import Database from '../../lib/server/database/Database';
import { toJson } from 'cli-highlight';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    // Database.getInstance().connect();
    // const characters = await User.relatedQuery('characters').for(10);
    // const apartments = await characters[0].$relatedQuery('apartments');

    const c = Character.parse({
        id: 1,
        firstName: 'Petras',
        lastName: 'Petraitis',
        cash: 15988,
        bank: 146874,
        dead: 0,
        phoneNumber: '864698714',
        health: 100,
        armor: 0,
        arrestTime: 0,
        dimension: 0,
        lastPosition: '{"x":0,"y":0,"z":0}',
        lastRotation: '{"x":0,"y":0,"z":0}',
    });

    response.json({ c: c.toJson() });
};
