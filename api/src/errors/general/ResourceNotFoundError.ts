import ErrorBase from '../ErrorBase';

export default class ResourceNotFoundError extends ErrorBase<'ResourceNotFoundError'> {
    constructor(message?: string, cause?: string) {
        super(
            'ResourceNotFoundError',
            message ?? 'Failed to find resource.',
            cause,
        );
    }
}
