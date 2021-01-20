import UnknownError from '../UnknownError';

export default class GetSessionError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetSessionError';
        this.message = message;
    }
}
