import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/server/database/Database';
import { User } from '../../lib/server/database/entities';
import Singleton from '../../lib/server/database/Singleton';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (!Database.isConnected) Database.connect();
    const users = await User.query().select('username', 'email');
    // // console.log(users);

    console.log(Singleton.getInstance());

    response.json({ users });
};
