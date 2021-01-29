import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { RegistrationRequest, User } from '../../database/entities';
import RequestHandler from '../RequestHandler';

export default class ValidRegisterRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.query;

        if (!email || !token) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        if (Array.isArray(email) || Array.isArray(token))
            return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            const user: User = await User.query().findOne({ email });

            if (!user) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            const registrationRequest: RegistrationRequest = await User.relatedQuery<RegistrationRequest>('registrationRequests')
                .for(user.id)
                .findOne({ token });

            if (!registrationRequest) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
            if (new Date() > registrationRequest.expires) {
                await User.relatedQuery<RegistrationRequest>('registrationRequests').for(user.id).delete().where({ token });
                return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
            }

            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
