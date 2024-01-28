import { DynamoDB as DynamoDBClient } from '@aws-sdk/client-dynamodb';

export default class DynamoDB {
    private static _instance: DynamoDBClient;

    public static getInstance(): DynamoDBClient {
        if (!this._instance)
            this._instance = new DynamoDBClient({
                region: process.env.AWS_DYNAMO_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
                    sessionToken: process.env.AWS_SESSION_TOKEN ?? '',
                },
            });
        return this._instance;
    }
}
