import { Stack, StackProps } from 'aws-cdk-lib';
import {
    AttributeType,
    Billing,
    Capacity,
    TableV2,
} from 'aws-cdk-lib/aws-dynamodb';
import { User } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DynamoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const dynamoDb = new TableV2(this, 'Post', {
            billing: Billing.provisioned({
                readCapacity: Capacity.autoscaled({ maxCapacity: 5 }),
                writeCapacity: Capacity.autoscaled({ maxCapacity: 5 }),
            }),
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            globalSecondaryIndexes: [
                {
                    indexName: 'gsi',
                    partitionKey: { name: 'pk', type: AttributeType.STRING },
                },
            ],
        });
    }
}
