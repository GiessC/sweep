import type { IncomingHttpHeaders } from 'http';
import type { JwtPayload as IJwtPayload, Jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import type { SigningKey } from 'jwks-rsa';
import { JwksClient } from 'jwks-rsa';
import awsConfig from '../../../config/awsConfig.json';

export interface JwtPayload extends IJwtPayload {
    'cognito:username': string;
    roles: string[];
}
const jwkClient = new JwksClient({
    jwksUri: awsConfig.CognitoJwkUrl,
});

let signingKeys: SigningKey[] = [];

export const getSigningKeys = async () => {
    if (signingKeys.length === 0) {
        signingKeys = await jwkClient.getSigningKeys();
    }
    return signingKeys;
};

export const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
    const tokenParts = headers.authorization?.split(' ');
    if (!tokenParts || tokenParts.length !== 2) {
        return null;
    }
    return tokenParts[1];
};

export const decodeJwt = (token: string): Jwt | null => {
    return jwt.decode(token, { complete: true });
};
