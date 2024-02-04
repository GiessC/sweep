import type { NextFunction, Request, Response } from 'express';
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
        response.status(401).send('Unauthorized');
        return;
    }
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        response.status(401).send('Unauthorized');
        return;
    }
    const kid = decodedToken.header.kid;
    const signingKeys = await getSigningKeys();
    const signingKey = signingKeys.find((key) => key.kid === kid);
    if (!signingKey) {
        response.status(401).send('Unauthorized');
        return;
    }
    try {
        jwt.verify(token, signingKey.getPublicKey(), {
            algorithms: ['RS256'],
            issuer: process.env.COGNITO_ISSUER,
        });
        next();
    } catch (error) {
        response.status(401).send('Unauthorized');
    }
};

export default verifyJwt;
