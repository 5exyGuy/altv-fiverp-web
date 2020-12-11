import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export enum TokenType {
    Refresh,
    Access,
}

type Cookie = {
    value: string;
    options?: cookie.CookieSerializeOptions;
};

export class Session {
    private _cookies: Map<TokenType, Cookie> = new Map();

    private constructor() {}

    public async sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secretOrPrivateKey, options, (error, encoded) => {
                if (error) reject(error);
                else resolve(encoded);
            });
        });
    }

    public async decode(
        token: string,
        options: jwt.DecodeOptions & {
            json: true;
        }
    ): Promise<string | { [key: string]: any }> {
        return jwt.decode(token, options);
    }

    public async verify(
        token: string,
        secretOrPublicKey: string | Buffer | { key: string | Buffer; passphrase: string } | jwt.GetPublicKeyOrSecret,
        options?: jwt.VerifyOptions
    ): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretOrPublicKey, options, (error, decoded) => {
                if (error) reject(error);
                else resolve(decoded);
            });
        });
    }

    public async generateRefreshToken(payload: string | object | Buffer, rememberMe: boolean = false): Promise<string> {
        return await this.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: rememberMe ? process.env.REFRESH_TOKEN_EXPIRATION_TIME_REMEMBER_ME : process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        });
    }

    public async generateAccessToken(payload: string | object | Buffer): Promise<string> {
        return await this.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        });
    }

    public addCookie(tokenType: TokenType, value: string, options?: cookie.CookieSerializeOptions): void {
        this._cookies.set(tokenType, { value, options });
    }

    public removeCookie(tokenType: TokenType): void {
        this._cookies.delete(tokenType);
    }

    public removeCookies(): void {
        this._cookies.clear();
    }

    public setCookies(response: NextApiResponse): void {
        const cookies = Array.from(this._cookies);
        response.setHeader(
            'Set-Cookie',
            cookies.map((cookieEntry) => {
                const [_tokenType, _cookie] = cookieEntry;
                if (_tokenType === TokenType.Access)
                    return cookie.serialize(process.env.ACCESS_TOKEN_COOKIE_NAME, _cookie.value, _cookie.options);
                else if (_tokenType === TokenType.Refresh)
                    return cookie.serialize(process.env.REFRESH_TOKEN_COOKIE_NAME, _cookie.value, _cookie.options);
            })
        );
    }

    public clearCookies(response: NextApiResponse): void {
        for (let [tokenType, cookie] of this._cookies.entries())
            this.addCookie(tokenType, cookie.value, { httpOnly: true, expires: new Date(0) });
        this.setCookies(response);
    }

    public getTokensFormCookies(request: NextApiRequest, options?: cookie.CookieParseOptions): [string, string] {
        const cookies: { [key: string]: string } = cookie.parse(request.headers.cookie || '', options);
        return [cookies[process.env.ACCESS_TOKEN_COOKIE_NAME], cookies[process.env.REFRESH_TOKEN_COOKIE_NAME]];
    }

    public async isLoggedIn(request: NextApiRequest): Promise<object> {
        return new Promise(async (resolve) => {
            const [accessToken, refreshToken] = this.getTokensFormCookies(request);

            if (!accessToken || !refreshToken) return resolve(undefined);

            try {
                resolve(await this.verify(accessToken, process.env.ACCESS_TOKEN_SECRET));
            } catch (error) {
                if (error?.name !== 'TokenExpiredError') return resolve(undefined);

                try {
                    resolve(await this.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
                } catch (error) {
                    resolve(undefined);
                }
            }
        });
    }

    private static _instance: Session = new Session();

    public static get instance(): Session {
        if (!this._instance) this._instance = new Session();
        return this._instance;
    }
}
