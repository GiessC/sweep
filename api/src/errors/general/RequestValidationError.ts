import ErrorBase from '../ErrorBase';

export default class RequestValidationError extends ErrorBase<'RequestValidationError'> {
    constructor(message?: string, cause?: string) {
        super('RequestValidationError', message ?? 'Invalid request.', cause);
    }
}
