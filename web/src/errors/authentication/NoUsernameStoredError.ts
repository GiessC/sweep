import ErrorBase from '../ErrorBase';

export default class NoUsernameStoredError extends ErrorBase<'NoUsernameStored'> {
    public constructor(message: string, cause?: unknown) {
        super('NoUsernameStored', message, cause);
    }
}
