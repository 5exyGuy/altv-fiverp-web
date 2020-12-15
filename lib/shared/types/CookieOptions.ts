export type CookieOptions = {
    httpOnly?: boolean;
    path?: string;
    sameSite?: 'none' | 'lax' | 'strict';
    secure?: boolean;
    maxAge?: number;
};
