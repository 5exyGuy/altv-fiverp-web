import UnknownError from '../UnknownError';

export default class CreateVerificationRequestError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'CreateVerificationRequestError';
        this.message = message;
    }
}
