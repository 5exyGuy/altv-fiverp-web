import UnknownError from './UnknownError';

export default class UnlinkAccountError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'UnlinkAccountError';
        this.message = message;
    }
}
