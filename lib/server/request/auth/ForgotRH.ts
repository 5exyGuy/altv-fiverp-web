import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';

export default class LoggedInRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {}
}
