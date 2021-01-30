import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { RegistrationRequest, User } from '../../database/entities';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ValidRegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.body;

        if (!email || !token)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(JsonMessage.convert('Neteisingi duomenys!', MessageType.WARNING));

        try {
            const user: User = await User.query().findOne({ email });

            if (!user)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(JsonMessage.convert('Nepavyko rasti vartotojo.', MessageType.WARNING));

            const registrationRequest: RegistrationRequest = await User.relatedQuery<RegistrationRequest>(
                'registrationRequests'
            )
                .for(user.id)
                .findOne({ token });

            if (!registrationRequest)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert('Nepavyko rasti registracijos patvirtinimo užklausos.', MessageType.WARNING)
                    );
            if (new Date() > registrationRequest.expires) {
                await User.relatedQuery<RegistrationRequest>('registrationRequests')
                    .for(user.id)
                    .delete()
                    .where({ token });
                return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
            }

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
