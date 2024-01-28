export default class ErrorHandler {
    public static handleError(error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            return error.message;
        }
        console.error(error ?? 'An unknown error occurred.');
        return error;
    }
}
