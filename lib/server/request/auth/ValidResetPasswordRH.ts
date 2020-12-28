import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
// import Database from '../../database/Database';
import RequestHandler from '../RequestHandler';

export default class ValidResetPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token } = request.query;

        if (!email || !token) return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        if (Array.isArray(email) || Array.isArray(token))
            return response.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });

        try {
            // const result = await Database.instance.PrismaClient.user.updateMany({
            //     where: { AND: { email: { equals: email }, passwordVerifyToken: { equals: token } } },
            //     data: { passwordVerifyToken: null, password: null },
            // });
            // if (result.count <= 0) return response.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });

            response.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
