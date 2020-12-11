import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Session, TokenType } from '../Session';
import Database from '../../database/Database';
import { User, UndefinedUser } from '../../../shared/types/User';

export default class LoginRequestHandler extends RequestHandler<User> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<User> {
        // Checking if the user is not already logged in
        if (await Session.instance.isLoggedIn(request)) {
            response.status(StatusCodes.FORBIDDEN).json({ error: 'Already logged in' });
            return UndefinedUser;
        }
        // Extracting user-supplied information
        const { username, password, rememberMe } = request.body;

        // Checking that the information received is not empty
        if (!username || !password) {
            response.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing parameters' });
            return UndefinedUser;
        }

        try {
            // Checking if such a user is registered
            const user = await Database.instance.PrismaClient.user.findFirst({
                where: { username: { equals: username } },
            });
            if (!user) {
                response.status(StatusCodes.BAD_REQUEST).json({ error: 'Such a user does not exist' });
                return UndefinedUser;
            }
            // Checking that the received password matches the database password
            if (!(await bcrypt.compare(password, user.password))) {
                response.status(StatusCodes.UNAUTHORIZED).json({ error: 'Incorrect password' });
                return UndefinedUser;
            }
            // Generating refresh and access token which will be stored in the cookies
            const refreshToken: string = await Session.instance.generateRefreshToken(
                { username: user.username, role: user.role },
                rememberMe
            );
            const accessToken: string = await Session.instance.generateAccessToken({ username: user.username, role: user.role });
            Session.instance.addCookie(TokenType.Refresh, refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 60,
            });
            Session.instance.addCookie(TokenType.Access, accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 60,
            });
            Session.instance.setCookies(response);

            response.status(StatusCodes.OK).json({ username: user.username, role: user.role });
            return { username: user.username, role: user.role };
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
            return UndefinedUser;
        }
    }
}
