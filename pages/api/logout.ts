import { NextApiRequest, NextApiResponse } from 'next';
import RequestHandler from '../../lib/request/RequestHandler';
import { RequestMethod } from '../../lib/request/RequestMethod';

class SimpleRequestHandler extends RequestHandler {
    public handle(request: NextApiRequest, response: NextApiResponse): void {
        console.log('SimpleRequestHandler');
        super.next(request, response);
    }
}

class AnotherSimpleRequestHandler extends RequestHandler {
    public handle(request: NextApiRequest, response: NextApiResponse): void {
        console.log('AnotherSimpleRequestHandler');
        response.json({ success: 'You successfuly reached the end!' });
        super.next(request, response);
    }
}

export default function (request: NextApiRequest, response: NextApiResponse) {
    const handler = new SimpleRequestHandler();
    const anotherHandler = new AnotherSimpleRequestHandler();
    handler.use(anotherHandler);
    handler.handleMethod(RequestMethod.POST, request, response);
}
