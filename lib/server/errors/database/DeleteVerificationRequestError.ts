import UnknownError from '../UnknownError';

export default class DeleteVerificationRequestError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'DeleteVerificationRequestError';
        this.message = message;
    }
}
