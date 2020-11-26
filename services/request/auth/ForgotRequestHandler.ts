import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../RequestHandler';

export default class ForgotRequestHandler extends RequestHandler {
    public handle(request: NextApiRequest, response: NextApiResponse): void {}
}
