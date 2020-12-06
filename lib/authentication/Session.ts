import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export enum TokenType {
    Refresh,
    Access,
}

export class Session {
    private constructor() {}

    public async sign(
        payload: string | object | Buffer,
        secretOrPrivateKey: jwt.Secret,
        options?: jwt.SignOptions
    ): Promise<string> {
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
            expiresIn: rememberMe
                ? process.env.REFRESH_TOKEN_EXPIRATION_TIME_REMEMBER_ME
                : process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        });
    }

    public async generateAccessToken(payload: string | object | Buffer): Promise<string> {
        return await this.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        });
    }

    public setCookie(
        response: NextApiResponse,
        tokenType: TokenType,
        value: string,
        options?: cookie.CookieSerializeOptions
    ): void {
        if (tokenType === TokenType.Refresh) {
            response.setHeader(
                'Set-Cookie',
                cookie.serialize(process.env.REFRESH_TOKEN_COOKIE_NAME, value, options ? options : { httpOnly: true })
            );
        } else if (tokenType === TokenType.Access) {
            response.setHeader(
                'Set-Cookie',
                cookie.serialize(process.env.ACCESS_TOKEN_COOKIE_NAME, value, options ? options : { httpOnly: true })
            );
        }
    }

    public getTokenFromCookie(
        request: NextApiRequest,
        tokenType: TokenType,
        options?: cookie.CookieParseOptions
    ): string {
        const cookies: { [key: string]: string } = cookie.parse(request.headers.cookie || '', options);
        console.log(cookies);
        let token: string;
        if (tokenType === TokenType.Refresh) token = cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];
        else if (tokenType === TokenType.Access) token = cookies[process.env.ACCESS_TOKEN_COOKIE_NAME];
        return token;
    }

    public async isLoggedIn(request: NextApiRequest): Promise<object> {
        return new Promise(async (resolve) => {
            const refreshToken: string = this.getTokenFromCookie(request, TokenType.Refresh);
            const accessToken: string = this.getTokenFromCookie(request, TokenType.Access);

            console.log(accessToken, refreshToken);

            if (!accessToken || !refreshToken) return resolve();

            try {
                resolve(await this.verify(accessToken, process.env.ACCESS_TOKEN_SECRET));
            } catch (error) {
                if (error?.name !== 'TokenExpiredError') return resolve();

                try {
                    resolve(await this.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
                } catch (error) {
                    resolve();
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
