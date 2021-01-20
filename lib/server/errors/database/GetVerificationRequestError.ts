import UnknownError from '../UnknownError';

export default class GetVerificationRequestError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetVerificationRequestError';
        this.message = message;
    }
}
