import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../database/Database';
import MailSender from '../../email/MailSender';
import RequestHandler from '../RequestHandler';
import uniqid from 'uniqid';

export default class ForgotPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email } = request.body;

        if (!email) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            const user = await Database.instance.PrismaClient.user.update({
                where: { email: email },
                data: { passwordVerifyToken: uniqid() },
            });

            if (!user) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            await MailSender.instance.sendResetPasswordRequest(user.email, user.passwordVerifyToken);
            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
