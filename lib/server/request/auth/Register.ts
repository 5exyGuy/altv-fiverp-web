import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import MailSender from '../../email/MailSender';
import uniqid from 'uniqid';
import { RegistrationRequest, User } from '../../database/entities';

export default class RegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { username, email, password } = request.body;

        // Check that all parameters are received
        if (!username || !email || !password) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            // Checking if such a user already exists
            const result: User = await User.query().findOne({ username, email });
            if (result) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }

        const hashedPassword: string = await bcrypt.hash(password, 10); // Hashed password
        const emailVerifyToken: string = uniqid();
        const expires: Date = new Date();
        expires.setDate(expires.getDate() + 7);

        try {
            // Create a new user with the received data
            const user: User = await User.query().insert({ email, username, password: hashedPassword });
            await User.relatedQuery<RegistrationRequest>('registration_requests').for(user.id).insert({ token: emailVerifyToken, expires });
            await MailSender.instance.sendEmailConfirmRequest(email, emailVerifyToken);
            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
