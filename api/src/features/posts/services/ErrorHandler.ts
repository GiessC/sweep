import type { Response } from 'express';
import InternalServerError from '../../../errors/general/InternalServerError';
import { StatusCodes } from 'http-status-codes';
import { UNKNOWN } from '../../../types/ErrorMessages';
import RequestValidationError from '../../../errors/general/RequestValidationError';
import ResourceNotFoundError from '../../../errors/general/ResourceNotFoundError';
import type APIResponseBody from '../../../routes/APIResponseBody';
import ErrorBase from '../../../errors/ErrorBase';

export default class ErrorHandler {
    public static handleError(error: unknown, response: Response) {
        const body: APIResponseBody<null> = {
            message: error instanceof Error ? error.message : UNKNOWN(),
            cause: error instanceof ErrorBase ? error.cause : undefined,
        };
        if (error instanceof InternalServerError) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(body);
        } else if (error instanceof RequestValidationError) {
            response.status(StatusCodes.BAD_REQUEST).send(body);
        } else if (error instanceof ResourceNotFoundError) {
            response.status(StatusCodes.NOT_FOUND).send(body);
        }
    }
}
