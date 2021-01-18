import UnknownError from './UnknownError';

export default class LinkAccountError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'LinkAccountError';
        this.message = message;
    }
}
