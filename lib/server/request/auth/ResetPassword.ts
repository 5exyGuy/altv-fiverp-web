import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResetPasswordRequest, User } from '../../database/entities';
import RequestHandler from '../RequestHandler';
import bcrypt from 'bcryptjs';

export default class ResetPasswordRequestHandler extends RequestHandler {
    public async handle(request: NextApiRequest, response: NextApiResponse): Promise<void> {
        const { email, token, password } = request.body;

        if (!email || !token || !password) return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Neteisingi duomenys!' });

        try {
            const user: User = await User.query().findOne({ email });
            if (!user) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Nepavyko rasti vartotojo.' });

            const resetPasswordRequest: ResetPasswordRequest = await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests')
                .for(user.id)
                .findOne({ token });
            if (!resetPasswordRequest)
                return response.status(StatusCodes.NOT_FOUND).json({ message: 'Nepavyko rasti slaptažodžio atstatymo užklausos.' });

            const hashedPassword: string = await bcrypt.hash(password, 10);
            await User.query().for(user.id).patch({ password: hashedPassword });
            await User.relatedQuery<ResetPasswordRequest>('resetPasswordRequests').for(user.id).delete();

            response.status(StatusCodes.OK).json({ message: 'Slaptažodis sėkmingai atstatytas!' });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Serveryje įvyko netikėta klaida.' });
        }
    }
}
