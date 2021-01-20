import UnknownError from '../UnknownError';

export default class DeleteSessionError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'DeleteSessionError';
        this.message = message;
    }
}
