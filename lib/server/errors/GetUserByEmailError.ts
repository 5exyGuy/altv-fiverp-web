import UnknownError from './UnknownError';

export default class GetUserByEmailError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetUserByEmailError';
        this.message = message;
    }
}
