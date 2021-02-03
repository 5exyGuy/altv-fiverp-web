import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import MailSender from '../../email/MailSender';
import uniqid from 'uniqid';
import { User } from '../../database/models';
import { createHash } from 'crypto';
import { JsonMessage, MessageType } from '../JsonMessage';
import { CommonTranslations } from '../../../../translations/Common';
import { AuthenticationTranslations } from '../../../../translations/Authentication';

export default class RegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { username, email, password } = request.body;

        // Check that all parameters are received
        if (!username || !email || !password)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.NOT_ENOUGH_DATA,
                        MessageType.WARNING
                    )
                );

        try {
            // Checking if such a user already exists
            const user: User = await User.query().findOne({ username, email });

            if (user)
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.SUCH_USER_ALREADY_EXISTS,
                            MessageType.WARNING
                        )
                    );
        } catch (error) {
            return response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(CommonTranslations.SERVER_ERROR, MessageType.ERROR));
        }

        const hashedPassword: string = await bcrypt.hash(password, 10); // Hashed password
        const hashedToken: string = createHash('sha256').update(uniqid()).digest('hex');
        const expires: Date = new Date();
        expires.setDate(expires.getDate() + 7);

        try {
            // Create a new user with the received data
            await User.query().insertGraph({
                email,
                username,
                password: hashedPassword,
                registrationRequests: [{ expires, token: hashedToken }],
            });

            await MailSender.instance.sendEmailConfirmRequest(email, hashedToken);

            response
                .status(StatusCodes.OK)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.REGISTRATION_REQUEST_HAS_BEEN_SUCCESSFULY_SENT,
                        MessageType.SUCCESS
                    )
                );
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(CommonTranslations.SERVER_ERROR, MessageType.ERROR));
        }
    }
}
