import ErrorBase from '../ErrorBase';

export default class NoAuthenticatedUserError extends ErrorBase<'NoAuthenticatedUser'> {
    public constructor(
        message: string = 'No user is currently logged in.',
        cause?: unknown,
    ) {
        super('NoAuthenticatedUser', message, cause);
    }
}
