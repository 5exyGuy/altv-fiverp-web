import { createHash } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResetPasswordRequest, User } from '../../database/models';
import MailSender from '../../email/MailSender';
import RequestHandler from '../RequestHandler';
import uniqid from 'uniqid';
import { JsonMessage, MessageType } from '../JsonMessage';
import { AuthenticationTranslations } from '../../../../translations/Authentication';
import { CommonTranslations } from '../../../../translations/Common';

export default class ForgotPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email } = request.body;
        if (!email)
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.NOT_ENOUGH_DATA,
                        MessageType.WARNING
                    )
                );

        try {
            const user: User = await User.query().findOne({ email });

            if (!user)
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json(
                        JsonMessage.convert(
                            AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER,
                            MessageType.WARNING
                        )
                    );

            // Spam protection
            const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery<ResetPasswordRequest>(
                'resetPasswordRequests'
            )
                .for(user.id)
                .orderBy('expires', 'DESC')
                .first();
            if (resetPasswordRequest) {
                const today: Date = new Date();
                today.setDate(today.getDate() + 7);

                const diff: number = today.getTime() - resetPasswordRequest.expires.getTime();
                // const seconds = diff / 1000;
                const minutes = diff / 1000 / 60;
                // const hours = minutes / 60;

                if (minutes < 60) {
                    const minutesLeft: number = Math.round(60 - minutes);
                    return response
                        .status(StatusCodes.NOT_FOUND)
                        .json(
                            JsonMessage.convert(
                                `Sistema negali priimti naujos užklausos. Prašome palaukti ${minutesLeft} ${
                                    minutesLeft > 1 ? 'minutes' : 'minutę'
                                }.`,
                                MessageType.WARNING
                            )
                        );
                }
            }

            const hashedToken: string = createHash('sha256').update(uniqid()).digest('hex');
            const expires: Date = new Date();
            expires.setDate(expires.getDate() + 7);

            await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests')
                .for(user.id)
                .insert({ expires, token: hashedToken });

            await MailSender.instance.sendResetPasswordRequest(email, hashedToken);
            response
                .status(StatusCodes.OK)
                .json(
                    JsonMessage.convert(
                        AuthenticationTranslations.RESET_PASSWORD_REQUEST_HAS_BEEN_SUCCESSFULY_SENT,
                        MessageType.WARNING
                    )
                );
        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(JsonMessage.convert(CommonTranslations.SERVER_ERROR, MessageType.ERROR));
        }
    }
}
