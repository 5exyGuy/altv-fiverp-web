import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticationTranslations } from '../../../../translations/Authentication';
import { RegistrationRequest, User } from '../../database/entities';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ValidRegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.body;

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

            const registrationRequest: RegistrationRequest = await User.relatedQuery<RegistrationRequest>(
                'registrationRequests'
            )
                .for(user.id)
                .findOne({ token });

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
                        JsonMessage.convert(AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER, MessageType.WARNING)
                    );
            }

            response
                .status(StatusCodes.OK)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.REGISTRATION_REQUEST_HAS_BEEN_FOUND,
                        MessageType.SUCCESS
                    )
                );
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(AuthenticationTranslations.SERVER_ERROR, MessageType.ERROR));
        }
    }
}
