import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResetPasswordRequest, User } from '../../database/entities';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ValidResetPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.query;

        if (!email || !token)
            return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        if (Array.isArray(email) || Array.isArray(token))
            return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            const user: User = await User.query().findOne({ email });

            if (!user) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery('resetPasswordRequests')
                .for(user.id)
                .findOne({ token });

            if (!resetPasswordRequest)
                return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(
                    JsonMessage.convert(
                        'Serveryje įvyko netikėta klaida. Jei ši klaida kartojasi, prašome apie tai pranešti administracijai.',
                        MessageType.ERROR
                    )
                );
        }
    }
}
