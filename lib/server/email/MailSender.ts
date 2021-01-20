import { createTransport, Transporter } from 'nodemailer';
import { EmailConfirmHtml, EmailConfirmText } from './templates/EmailConfirm';
import { ResetPasswordHtml, ResetPasswordText } from './templates/PasswordReset';

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
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '9e1037e72610cd',
                pass: 'e8a229d346cc49',
            },
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
