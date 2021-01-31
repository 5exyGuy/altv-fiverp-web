import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticationTranslations } from '../../../../translations/Authentication';
import { ResetPasswordRequest, User } from '../../database/entities';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ValidResetPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.body;

        // Checking whether email and token are defined
        if (!email || !token)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(JsonMessage.convert(AuthenticationTranslations.NOT_ENOUGH_DATA, MessageType.WARNING));

        try {
            const user: User = await User.query().findOne({ email });

            if (!user)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert(AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER, MessageType.WARNING)
                    );

            const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery('resetPasswordRequests')
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

            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(AuthenticationTranslations.SERVER_ERROR, MessageType.ERROR));
        }
    }
}
