import { NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod } from './RequestMethod';

export default abstract class RequestHandler {
    protected _nextHandler: RequestHandler;
    private _method: RequestMethod = RequestMethod.ALL;

    /**
     * Checks if a response has not been sent
     * @param response Route response
     */
    protected isResponseSent(response: NextApiResponse): boolean {
        return response.headersSent || response.writableEnded;
    }

    /**
     * Hooks another handler on top of the current handler
     * @param handler Next handler
     */
    public use(handler: RequestHandler): RequestHandler {
        this._nextHandler = handler;
        return handler;
    }

    /**
     * Hooks another handler on top of the current handler with specified request method
     * @param method HTTP request method
     * @param handler Next handler
     */
    public useMethod(method: RequestMethod, handler: RequestHandler): RequestHandler {
        this._method = method;
        this._nextHandler = handler;
        return handler;
    }

    /**
     * Moves to the next handler
     * @param request Route request
     * @param response Route response
     */
    public next(request: NextApiRequest, response: NextApiResponse): void {
        if (!this._nextHandler && this.isResponseSent(response)) return;
        if (!this._method || this._method === RequestMethod.ALL || this._method === request.method)
            this._nextHandler.handle(request, response);
    }

    /**
     * Handles the received request
     * @param request Route request
     * @param response Route response
     */
    public abstract handle(request: NextApiRequest, response: NextApiResponse): void;

    /**
     * Handles the received request with specified request method
     * @param method Request method
     * @param request Route request
     * @param response Route response
     */
    public handleMethod(method: RequestMethod, request: NextApiRequest, response: NextApiResponse): void {
        if (request.method !== method) return response.json('405 Method Not Allowed');
        this.handle(request, response);
    }
}
