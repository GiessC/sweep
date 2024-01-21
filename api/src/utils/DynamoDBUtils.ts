import { AttributeValue, AttributeValueUpdate } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import JsonAble from '../db/JsonAble';

export const mapFromDynamo = <T>(
    attributes: Record<string, AttributeValue>,
) => {
    return unmarshall(attributes) as T;
};

export const mapFromDynamoArray = <T>(
    records: Record<string, AttributeValue>[],
) => {
    return records.map((record: Record<string, AttributeValue>) =>
        mapFromDynamo<T>(record),
    );
};

export const mapToDynamo = <T>(
    attributes: T,
): Record<string, AttributeValue> => {
    return marshall<T>(attributes, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    });
};
