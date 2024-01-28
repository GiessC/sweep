import APIResponse from '../APIResponse';
import { UNKNOWN } from '../../errors/ErrorMessages';

export default class ErrorHandler {
    public static handleError<T = unknown>(error: unknown): APIResponse<T> {
        if (error instanceof Error) {
            console.error(error?.message);
            return ErrorHandler.handleNormalError(error);
        } else {
            console.error(error);
            return ErrorHandler.handleUnknownError(error);
        }
    }

    private static handleUnknownError<T = unknown>(
        error: unknown,
    ): APIResponse<T> {
        return {
            message: UNKNOWN(),
            errors: [
                {
                    fields: [],
                    location: 'unknown',
                    msg: UNKNOWN(),
                    nestedErrors: [],
                    type: 'unknown',
                    path: '',
                    value: error,
                },
            ],
        };
    }

    private static handleNormalError<T = unknown>(
        error: Error,
    ): APIResponse<T> {
        return {
            message: error?.message,
            errors: [
                {
                    fields: [],
                    location: 'unknown',
                    msg: error?.message,
                    nestedErrors: [],
                    path: '',
                    type: 'error',
                    value: error,
                },
            ],
        };
    }
}
