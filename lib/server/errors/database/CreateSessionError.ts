import UnknownError from '../UnknownError';

export default class CreateSessionError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'CreateSessionError';
        this.message = message;
    }
}
