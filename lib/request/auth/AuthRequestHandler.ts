import RequestHandler from '../RequestHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default class AuthRequestHandler extends RequestHandler {
    public handle(request: NextApiRequest, response: NextApiResponse): void {
        const cookies: { [key: string]: string } = cookie.parse(request.headers.cookie || '');
        const accessToken: string = cookies['token'];

        if (!accessToken) return response.status(401).send('401');

        jwt.verify(accessToken, 'mysecretaccesstoken', (error, user) => {
            if (error) return response.status(403).send('403');
            super.next(request, response);
        });
    }
}
