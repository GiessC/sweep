import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import APIResponseBody from '../../routes/APIResponseBody';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = (request: Request, response: Response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        const body: APIResponseBody<null> = {
            message: 'One or more errors occurred.',
            errors: result.array(),
        };
        response.status(StatusCodes.BAD_REQUEST).send(body);
    }
};
