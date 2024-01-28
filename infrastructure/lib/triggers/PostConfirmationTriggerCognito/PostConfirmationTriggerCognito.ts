import type { PostConfirmationTriggerEvent } from 'aws-lambda';
import {
    DynamoDB as DynamoDBClient,
    PutItemCommand,
} from '@aws-sdk/client-dynamodb';

export const handler = async (event: PostConfirmationTriggerEvent) => {
    const username = event.userName;
    const attributes: Record<string, string> = event.request.userAttributes;

    const userId = attributes['sub'];

    const dynamoDbClient = new DynamoDBClient({
        region: process.env.DYNAMO_DB_REGION,
    });
    try {
        await dynamoDbClient.send(
            new PutItemCommand({
                TableName: process.env.DYNAMO_DB_POSTS_TABLE_NAME,
                Item: {
                    pk: {
                        S: `User-${userId}`, // TODO: What if we change this schema...
                    },
                    sk: {
                        S: username,
                    },
                    id: { S: userId },
                    username: { S: username },
                },
            }),
        );
    } catch (error: unknown) {
        console.error(error);
    }
};
