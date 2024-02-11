export default class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause?: string;

    constructor(name: T, message: string, cause?: string) {
        super(message);
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}
