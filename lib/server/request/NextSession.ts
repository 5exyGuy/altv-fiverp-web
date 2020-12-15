import { NextApiRequest, NextApiResponse } from 'next';
import { CookieOptions } from '../../shared/types/CookieOptions';
import { SessionOptions } from '../../shared/types/SessionOptions';
import Store from './Store';

export class NextSession {
    private constructor() {}

    private computeCookieMaxAge(ttl: number): number {
        // The next line makes sure browser will expire cookies before seals are considered expired by the server.
        // It also allows for clock difference of 60 seconds maximum between server and clients.
        return (ttl === 0 ? 2147483647 : ttl) - 60;
    }

    private getCookieOptions(userCookieOptions: CookieOptions, ttl: number): CookieOptions {
        const defaultCookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        };

        return {
            ...defaultCookieOptions,
            ...userCookieOptions,
            maxAge: userCookieOptions.maxAge || this.computeCookieMaxAge(ttl),
        };
    }

    public applySession(request: NextApiRequest, response: NextApiResponse, sessionOptions: SessionOptions): void {
        const cookieOptions: CookieOptions = this.getCookieOptions(sessionOptions.cookieOptions, sessionOptions.ttl);
    }

    private async getOrCreateStore(
        sealed: string,
        password: string | Array<{ id: string; password: string }>,
        ttl: number
    ): Promise<Store> {
        try {
            return await Store.createStore(password, ttl, sealed);
        } catch (err) {
            if (err.message === 'Expired seal' || err.message === 'Bad hmac value' || err.message === 'Cannot find password: ') {
                // if seal expires or
                // if seal is not valid (encrypted using a different password, when passwords are updated) or
                // if we can't find back the password in the seal
                // then we just start a new session over
                return await Store.createStore(password, ttl);
            }
            throw err;
        }
    }

    private static _instance: NextSession = new NextSession();

    public static get instance(): NextSession {
        if (!this._instance) this._instance = new NextSession();
        return this._instance;
    }
}
