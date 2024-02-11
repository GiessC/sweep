import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {
    decodeJwt,
    getSigningKeys,
    getTokenFromHeaders,
} from '../utils/jwt/jwt';
import APIResponseBody from '../routes/APIResponseBody';
import { JwksError } from 'jwks-rsa';
import InternalServerError from '../errors/general/InternalServerError';

const UNAUTHORIZED_BODY: APIResponseBody<null> = {
    message: 'You are not authorized to perform this action.',
    errors: [
        {
            msg: 'You are not authorized to perform this action.',
            type: 'alternative',
            nestedErrors: [],
        },
    ],
};

const SERVER_ERROR = new InternalServerError();
const SERVER_ERROR_BODY: APIResponseBody<null> = {
    message: SERVER_ERROR.message,
    cause: SERVER_ERROR.cause,
    errors: [
        {
            msg: SERVER_ERROR.message,
            type: 'alternative',
            nestedErrors: [],
        },
    ],
};

const verifyJwt = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
        response.status(StatusCodes.UNAUTHORIZED).send(UNAUTHORIZED_BODY);
        return;
    }
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        response.status(StatusCodes.UNAUTHORIZED).send(UNAUTHORIZED_BODY);
        return;
    }
    const kid = decodedToken.header.kid;

    try {
        const signingKeys = await getSigningKeys();
        const signingKey = signingKeys.find((key) => key.kid === kid);
        if (!signingKey) {
            response.status(StatusCodes.UNAUTHORIZED).send(UNAUTHORIZED_BODY);
            return;
        }
        jwt.verify(token, signingKey.getPublicKey(), {
            algorithms: ['RS256'],
            issuer: process.env.COGNITO_ISSUER,
        });
        next();
    } catch (error: unknown) {
        if (error instanceof JwksError) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(SERVER_ERROR_BODY);
            return;
        }
        response.status(StatusCodes.UNAUTHORIZED).send(UNAUTHORIZED_BODY);
    }
};

export default verifyJwt;
