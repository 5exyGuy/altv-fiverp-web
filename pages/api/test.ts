import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/server/database/Database';
import { User } from '../../lib/server/database/entities';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (!Database.isConnected) Database.connect();
    const users = await User.query().select('username', 'email').debug();
    // console.log(users);
    response.json({ users });
};
