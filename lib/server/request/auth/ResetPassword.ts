import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResetPasswordRequest, User } from '../../database/entities';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';
import { JsonMessage, MessageType } from '../JsonMessage';
import { AuthenticationTranslations } from '../../../../translations/Authentication';

export default class ResetPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token, password } = request.body;

        if (!email || !token || !password)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(JsonMessage.convert(AuthenticationTranslations.NOT_ENOUGH_DATA, MessageType.WARNING));

        try {
            const user: User = await User.query().findOne({ email });
            if (!user)
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(
                        JsonMessage.convert(AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER, MessageType.WARNING)
                    );

            const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery<ResetPasswordRequest>(
                'resetPasswordRequests'
            )
                .for(user.id)
                .findOne({ token });
            if (!resetPasswordRequest)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.COULD_NOT_FIND_RESET_PASSWORD_REQUEST,
                            MessageType.WARNING
                        )
                    );

            const hashedPassword: string = await bcrypt.hash(password, 10);
            await User.query().for(user.id).patch({ password: hashedPassword });
            await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests').for(user.id).delete();

            response
                .status(StatusCodes.OK)
                .json(JsonMessage.convert('Slaptažodis sėkmingai atstatytas!', MessageType.SUCCESS));
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(AuthenticationTranslations.SERVER_ERROR, MessageType.ERROR));
        }
    }
}
