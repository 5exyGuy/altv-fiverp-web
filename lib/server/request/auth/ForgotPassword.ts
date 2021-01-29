import { createHash } from 'crypto';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResetPasswordRequest, User } from '../../database/entities';
import MailSender from '../../email/MailSender';
import RequestHandler from '../RequestHandler';
import uniqid from 'uniqid';

export default class ForgotPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email } = request.body;

        if (!email) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            const user: User = await User.query().findOne({ email });

            if (!user) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            // TODO: Finish spam protection
            // const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests')
            //     .for(user.id)
            //     .orderBy('expires', 'DESC')
            //     .first();
            // const date: Date = new Date();
            // date.setDate(date.getDate() + 7);
            // if (resetPasswordRequest.expires)

            const hashedToken: string = createHash('sha256').update(uniqid()).digest('hex');
            const expires: Date = new Date();
            expires.setDate(expires.getDate() + 7);

            await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests').for(user.id).insert({ expires, token: hashedToken });

            await MailSender.instance.sendResetPasswordRequest(email, hashedToken);
            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
