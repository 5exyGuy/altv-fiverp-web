import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import { JsonMessage, MessageType } from '../JsonMessage';
import RequestHandler from '../RequestHandler';

export default class DatabaseConnectionRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        try {
            const database: Database = Database.getInstance();
            database.connect();
            super.next(request, response);
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
