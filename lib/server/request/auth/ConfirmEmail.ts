import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticationTranslations } from '../../../../translations/Authentication';
import { CommonTranslations } from '../../../../translations/Common';
import { RegistrationRequest, User } from '../../database/models';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ConfirmEmailRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.body;

        if (!email || !token)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.NOT_ENOUGH_DATA,
                        MessageType.WARNING
                    )
                );

        try {
            const user: User = await User.query().patch({ verified: true }).findOne({ email });
            if (!user)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER,
                            MessageType.WARNING
                        )
                    );

            const registrationRequest: RegistrationRequest = await User.relatedQuery<RegistrationRequest>(
                'registrationRequests'
            )
                .for(user.id)
                .findOne({ token })
                .debug();
            if (!registrationRequest)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.COULD_NOT_FIND_REGISTRATION_REQUEST,
                            MessageType.WARNING
                        )
                    );

            if (new Date() > registrationRequest.expires) {
                await User.relatedQuery<RegistrationRequest>('registrationRequests')
                    .for(user.id)
                    .delete()
                    .where({ token });
                return response
                    .status(StatusCodes.BAD_REQUEST)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER,
                            MessageType.WARNING
                        )
                    );
            }

            response
                .status(StatusCodes.OK)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.EMAIL_HAS_BEEN_SUCCESSFULY_REDEEMED,
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
