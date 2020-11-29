import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

let users = {
    john: { password: 'passwordjohn' },
    mary: { password: 'passwordmary' },
};

export default class LoginRequestHandler extends RequestHandler {
    public handle(request: NextApiRequest, response: NextApiResponse): void {
        const cookies: { [key: string]: string } = cookie.parse(
            request.headers.cookie || ''
        );
        console.log(request.query);

        const username: string = <string>request.query.username;
        const password: string = <string>request.query.password;

        if (!username || !password || users[username].password !== password)
            return response
                .status(StatusCodes.UNAUTHORIZED)
                .send(ReasonPhrases.UNAUTHORIZED);

        const payload = { username };
        const accessToken: string = jwt.sign(payload, 'mysecretaccesstoken', {
            algorithm: 'HS256',
            expiresIn: 120,
        });
        const refreshToken: string = jwt.sign(payload, 'mysecretrefreshtoken', {
            algorithm: 'HS256',
            expiresIn: 86400,
        });

        users[username].refreshToken = refreshToken;

        response.setHeader(
            'Set-Cookie',
            cookie.serialize('jwt', accessToken, {
                httpOnly: true,
                maxAge: 60,
            })
        );
        response.send({ accessToken, refreshToken });
    }
}
