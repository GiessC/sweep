import ErrorBase from '../ErrorBase';

export default class NoAuthenticatedUserError extends ErrorBase<'NoAuthenticatedUser'> {
    public constructor(message: string, cause?: unknown) {
        super('NoAuthenticatedUser', message, cause);
    }
}
