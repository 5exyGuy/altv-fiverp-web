import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Prisma from '@prisma/client';
import uniqid from 'uniqid';
import User from '../../database/entities/User';
import UserBuilder from '../../database/builders/UserBuilder';
import { Session } from '../Session';
import Database from '../../database/Database';

export default class RegisterRH extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        if (await Session.instance.isLoggedIn(request)) return response.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);

        const { username, email, password } = request.body;

        // Check that all parameters are received
        if (!username || !email || !password) return response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

        try {
            // Checking if such a user already exists
            const result = await Database.instance.PrismaClient.user.findFirst({
                where: { OR: [{ username: { equals: username } }, { email: { equals: email } }] },
            });
            if (result) return response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }

        const hashedPassword: string = await bcrypt.hash(password, 10); // Hashed password

        const user: User = <User>new UserBuilder()
            .setUsername(username)
            .setEmail(email)
            .setPassword(hashedPassword)
            .setRole('user')
            .setRegistrationDate(new Date()) // Current date
            .setVerified(false) // Must be verified by email
            .setConfirmationToken(uniqid()) // A confirmation token will be sent to the specified email
            .build();

        try {
            // Create a new user with the received data
            await Database.instance.PrismaClient.user.create({
                data: {
                    ...(<Prisma.UserCreateInput>user.convertToObject()),
                },
            });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }

        response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    }
}
