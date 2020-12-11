import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';

export default class ForgotRequestHandler extends RequestHandler<void> {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {}
}
