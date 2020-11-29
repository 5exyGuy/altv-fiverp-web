import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

const prisma: PrismaClient = new PrismaClient();

export default class RegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const username: string = request.body.username;
        const email: string = request.body.email;
        const password: string = request.body.password;

        if (!username || !email || !password)
            return response.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);

        const hashedPassword: string = await bcrypt.hash(password, 10);

        // const user: User = <User>(
        //     new UserBuilder()
        //         .setUsername(username)
        //         .setEmail(email)
        //         .setPassword(hashedPassword)
        //         .setRegistrationDate(new Date())
        //         .build()
        // );
        // user.save();

        const payload = {
            username,
        };
        const refreshToken: string = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: 86400,
        });

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                registrationDate: new Date(),
                verified: false,
                refreshToken: refreshToken,
                ConfirmationToken: {
                    create: [
                        {
                            token: uniqid(),
                        },
                        {
                            token: uniqid(),
                        },
                    ],
                },
            },
        });

        response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    }
}
