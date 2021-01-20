import UnknownError from '../UnknownError';

export default class UpdateUserError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'UpdateUserError';
        this.message = message;
    }
}
