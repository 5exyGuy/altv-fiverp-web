import UnknownError from './UnknownError';

export default class GetUserByCredentialsError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetUserByCredentialsError';
        this.message = message;
    }
}
