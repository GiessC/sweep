export default class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause?: unknown;

    constructor(name: T, message: string, cause?: unknown) {
        super(message, {
            cause,
        });
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}
