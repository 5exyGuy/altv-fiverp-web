import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod } from './RequestMethod';

export default abstract class RequestHandler {
    protected _nextHandler: RequestHandler;
    protected _data: Map<string, any> = new Map();
    private _method: RequestMethod = RequestMethod.ALL;

    /**
     * Checks if a response has not been sent
     * @param response Route response
     */
    protected isResponseSent(response: NextApiResponse): boolean {
        return response.headersSent || response.writableEnded;
    }

    protected setNextHandlerMeta(key: string, value: any): void {
        if (!this._nextHandler) return;
        if (!this._nextHandler._data) this._nextHandler._data = new Map();
        this._nextHandler._data.set(key, value);
    }

    protected getMeta(key: string): any {
        if (!this._data) this._data = new Map();
        return this._data.get(key);
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
    public async next(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        if (!this._nextHandler) return;
        if (this.isResponseSent(response)) return;
        if (!this._method || this._method === RequestMethod.ALL || this._method === request.method)
            await this._nextHandler.handle(request, response);
    }

    /**
     * Handles the received request
     * @param request Route request
     * @param response Route response
     */
    public abstract handle(request: NextApiRequest, response: NextApiResponse): Promise<void>;

    /**
     * Handles the received request with specified request method
     * @param method Request method
     * @param request Route request
     * @param response Route response
     */
    public async handleMethod(method: RequestMethod, request: NextApiRequest, response: NextApiResponse): Promise<void> {
        if (request.method !== method) return response.status(StatusCodes.METHOD_NOT_ALLOWED).json(ReasonPhrases.METHOD_NOT_ALLOWED);
        this.handle(request, response);
    }
}
