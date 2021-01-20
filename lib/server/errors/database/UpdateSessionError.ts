import UnknownError from '../UnknownError';

export default class UpdateSessionError extends UnknownError {
    constructor(message) {
        super(message);
        this.name = 'UpdateSessionError';
        this.message = message;
    }
}
