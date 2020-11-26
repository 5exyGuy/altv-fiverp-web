import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';

export default class RegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const username: string = request.body.username;
        const email: string = request.body.email;
        const password: string = request.body.password;

        if (!username || !email || !password) return response.status(400).send('400 Bad Request');

        const hashedPassword: string = await bcrypt.hash(password, process.env.PASSWORD_SALT);
    }
}
