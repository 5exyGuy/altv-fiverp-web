import { CookieOptions } from './CookieOptions';

export type SessionOptions = {
    /** Name of the cookie
     *
     * Required */
    cookieName: string;

    /** The options for the cookie
     *
     * Default: {
        httpOnly: true,
        path: "/",
        sameSite: 'lax'
        secure: true
       } */
    cookieOptions?: CookieOptions;

    /** Password of the cookie
     *
     *  Required */
    password: string | { id: number; password: string }[];

    /** Time to live in seconds.
     *
     * Default: 15 days 8 */
    ttl?: number;
};
