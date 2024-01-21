import { AttributeValue, AttributeValueUpdate } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import Dto from '../db/Dto';

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

export const mapToDynamoUpdateExpression = <T>(
    item: T,
): [string, Record<string, AttributeValue>] => {
    let expression = 'SET ';
    const expressionAttributeValues: Record<string, AttributeValue> = {};
    const itemAttributes = mapToDynamo<T>(item);

    let flag = false;
    for (const attribute in itemAttributes) {
        flag = true;
        expression += `${attribute} = :${attribute}, `;
        expressionAttributeValues[`:${attribute}`] = itemAttributes[attribute];
    }

    if (!flag) return ['', {}];

    return [expression, expressionAttributeValues];
};
