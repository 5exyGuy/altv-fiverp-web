import UnknownError from './UnknownError';

export default class DeleteUserError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'DeleteUserError';
        this.message = message;
    }
}
