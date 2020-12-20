import { createTransport, Transporter } from 'nodemailer';
import { EmailLoginHtml, EmailLoginText } from './templates/EmailLogin';
import { EmailConfirmHtml, EmailConfirmText } from './templates/EmailConfirm';
import { ResetPasswordHtml, ResetPasswordText } from './templates/PasswordReset';
import Router from 'next/router';

interface VerificationRequestParams {
    identifier: string;
    url: string;
    baseUrl: string;
    provider: ProviderEmailOptions;
}

interface ProviderEmailOptions {
    server?: string | ProviderEmailServer;
    from?: string;
    maxAge?: number;
    sendVerificationRequest?: (options: VerificationRequestParams) => Promise<void>;
}

interface ProviderEmailServer {
    host: string;
    port: number;
    auth: ProviderEmailAuth;
}

interface ProviderEmailAuth {
    user: string;
    pass: string;
}

export default class MailSender {
    private _transporter: Transporter;

    private constructor() {
        this._transporter = createTransport({
            pool: true,
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'tiffany.dickinson17@ethereal.email',
                pass: 'kg3y4VxtB4KvMhURBZ',
            },
        });
    }

    public async sendEmailLoginRequest(options: VerificationRequestParams): Promise<void> {
        return new Promise((resolve, reject) => {
            const { from } = options.provider;
            const url: string = options.url;
            const email: string = options.identifier;

            this._transporter.sendMail(
                {
                    to: email,
                    from,
                    subject: `[FiveRP.LT] Prisijungimas elektroniniu paštu`,
                    text: EmailLoginText(url),
                    html: EmailLoginHtml(url),
                },
                (error) => {
                    if (error) return reject(error);
                    return resolve();
                }
            );
        });
    }

    public async sendEmailConfirmRequest(email: string, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const from: string = process.env.EMAIL_FROM;
            const baseUrl: string = process.env.NEXTAUTH_URL;
            const url: string = baseUrl.concat(
                '/api/authentication/confirm?email=',
                encodeURIComponent(email),
                '&token=',
                encodeURIComponent(token)
            );
            this._transporter.sendMail(
                {
                    to: email,
                    from,
                    subject: `[FiveRP.LT] Registracijos patvirtinimas`,
                    text: EmailConfirmText(url),
                    html: EmailConfirmHtml(url),
                },
                (error) => {
                    if (error) return reject(error);
                    return resolve();
                }
            );
        });
    }

    public async sendResetPasswordRequest(email: string, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const from: string = process.env.EMAIL_FROM;
            const baseUrl: string = process.env.NEXTAUTH_URL;
            const url: string = baseUrl.concat(
                '/api/authentication/reset?email=',
                encodeURIComponent(email),
                '&token=',
                encodeURIComponent(token)
            );
            this._transporter.sendMail(
                {
                    to: email,
                    from,
                    subject: `[FiveRP.LT] Slaptažodžio atstatymas`,
                    text: ResetPasswordText(url),
                    html: ResetPasswordHtml(url),
                },
                (error) => {
                    if (error) return reject(error);
                    return resolve();
                }
            );
        });
    }

    private static _instance: MailSender = new MailSender();

    public static get instance(): MailSender {
        if (!this._instance) this._instance = new MailSender();
        return this._instance;
    }
}
