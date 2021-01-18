import UnknownError from './UnknownError';

export default class GetUserByProviderAccountIdError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'GetUserByProviderAccountIdError';
        this.message = message;
    }
}
