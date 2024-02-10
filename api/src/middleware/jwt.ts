import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {
    decodeJwt,
    getSigningKeys,
    getTokenFromHeaders,
} from '../utils/jwt/jwt';

const verifyJwt = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('You are not authorized to perform this action.');
        return;
    }
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('You are not authorized to perform this action.');
        return;
    }
    const kid = decodedToken.header.kid;
    const signingKeys = await getSigningKeys();
    const signingKey = signingKeys.find((key) => key.kid === kid);
    if (!signingKey) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('You are not authorized to perform this action.');
        return;
    }
    try {
        jwt.verify(token, signingKey.getPublicKey(), {
            algorithms: ['RS256'],
            issuer: process.env.COGNITO_ISSUER,
        });
        next();
    } catch (error) {
        response
            .status(StatusCodes.UNAUTHORIZED)
            .send('You are not authorized to perform this action.');
    }
};

export default verifyJwt;
