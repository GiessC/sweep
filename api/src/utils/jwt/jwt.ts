import { JwksClient, SigningKey } from 'jwks-rsa';
import awsConfig from '../../../config/awsConfig.json';

const jwkClient = new JwksClient({
    jwksUri: awsConfig.CognitoUrl, // TODO: This should be in .env or some config
});

let signingKeys: SigningKey[] = [];

const getSigningKeys = async () => {
    if (signingKeys.length === 0) {
        signingKeys = await jwkClient.getSigningKeys();
    }
    return signingKeys;
};

export default getSigningKeys;
