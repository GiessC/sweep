import ErrorBase from '../ErrorBase';

export default class InternalServerError extends ErrorBase<'InternalServerError'> {
    constructor(message?: string, cause?: string) {
        super(
            'InternalServerError',
            message ??
                'Internal server error occurred. Please try again or contact support.',
            cause,
        );
    }
}
