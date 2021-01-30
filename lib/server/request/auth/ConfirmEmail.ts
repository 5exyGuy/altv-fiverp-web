import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import { User } from '../../database/entities';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class ConfirmEmailRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.query;

        if (!email || !token)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(JsonMessage.convert('Trūksta duomenų!', MessageType.WARNING));
        if (Array.isArray(email) || Array.isArray(token))
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(JsonMessage.convert('Neteisingi duomenys!', MessageType.WARNING));

        try {
            const result = await User.query().patch({ verified: true }).where('email', email);
            if (result <= 0)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(JsonMessage.convert('Nepavyko rasti vartotojo.', MessageType.WARNING));

            response
                .status(StatusCodes.OK)
                .json(JsonMessage.convert('Elektroninis paštas sėkmingai patvirtintas.', MessageType.SUCCESS));
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
