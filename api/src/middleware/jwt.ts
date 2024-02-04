import { NextFunction, Request, Response } from 'express';
import getSigningKeys from '../utils/jwt/jwt';

const jwtValidate = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const token = request.headers.authorization;
    console.log(token);

    const signingKeys = await getSigningKeys();
    console.log(signingKeys);

    next();
};

export default jwtValidate;
