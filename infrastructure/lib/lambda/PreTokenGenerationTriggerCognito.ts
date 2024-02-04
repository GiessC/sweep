import type { GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBClient,
    GetItemCommand,
    ResourceNotFoundException,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import type { PreTokenGenerationTriggerEvent } from 'aws-lambda';

const getPk = (id: string): string => `User-${id}`;
const getSk = (username: string): string => username;

export const handler = async (event: PreTokenGenerationTriggerEvent) => {
    console.log(event);
    const username = event.userName;
    const attributes: Record<string, string> = event.request.userAttributes;

    const userId = attributes['sub'];
    try {
        const response = await getUser(userId, username);
        const item = response?.Item;
        console.log(item);
        const user = item ? unmarshall(item) : undefined;
        console.log(user);
        const roles = user?.roles ?? [];
        console.log(roles);

        event.response.claimsOverrideDetails = {
            claimsToAddOrOverride: {
                roles: JSON.stringify(roles),
            },
        };
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
    console.log(event);
    return event;
};

const getUser = async (
    userId: string,
    username: string,
): Promise<GetItemCommandOutput | undefined> => {
    const dynamoDbClient = new DynamoDBClient({
        region: process.env.DYNAMO_DB_REGION,
    });
    try {
        return await dynamoDbClient.send(
            new GetItemCommand({
                TableName: 'Sweep-User',
                Key: {
                    pk: {
                        S: getPk(userId),
                    },
                    sk: {
                        S: getSk(username),
                    },
                },
            }),
        );
    } catch (error: unknown) {
        if (error instanceof ResourceNotFoundException) {
            return undefined;
        } else {
            throw error;
        }
    }
};
