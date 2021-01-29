import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/server/database/Database';
import { User } from '../../lib/server/database/entities';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const database: Database = Database.getInstance();
    // console.log(database);
    if (!database.isConnected) database.connect();
    const users = await User.query();
    // // console.log(users);

    response.json({ users });
};
