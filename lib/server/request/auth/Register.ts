import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import MailSender from '../../email/MailSender';
import { Prisma } from '@prisma/client';
import uniqid from 'uniqid';

export default class RegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { username, email, password } = request.body;

        // Check that all parameters are received
        if (!username || !email || !password) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            // Checking if such a user already exists
            const result = await Database.getConnection().user.findFirst({
                where: { OR: [{ name: { equals: username } }, { email: { equals: email } }] },
            });
            if (result) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }

        const hashedPassword: string = await bcrypt.hash(password, 10); // Hashed password
        const emailVerifyToken: string = uniqid();
        const expires: Date = new Date();
        expires.setDate(expires.getDate() + 7);

        // const user: User = <User>new UserBuilder()
        //     .setUsername(username)
        //     .setEmail(email)
        //     .setPassword(hashedPassword)
        //     .setEmailVerifyToken(uniqid()) // A confirmation token will be sent to the specified email
        //     .build();

        try {
            // Create a new user with the received data
            await Database.getRepository<Prisma.UserDelegate>('user').create({ data: { email, username, password: hashedPassword } });
            await Database.getRepository<Prisma.RegistrationRequestDelegate>('registrationRequest').create({
                data: { token: emailVerifyToken, identifier: email, expires },
            });
            await MailSender.instance.sendEmailConfirmRequest(email, emailVerifyToken);
            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
