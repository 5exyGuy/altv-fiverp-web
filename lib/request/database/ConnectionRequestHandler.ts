import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';

export default class ConnectionRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        super.next(request, response);
    }
}
