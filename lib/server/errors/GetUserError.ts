import UnknownError from './UnknownError';

export default class GetUserError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetUserError';
        this.message = message;
    }
}
