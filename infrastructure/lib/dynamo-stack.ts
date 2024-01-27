import { Stack, StackProps } from 'aws-cdk-lib';
import {
    AttributeType,
    Billing,
    Capacity,
    TableV2,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DynamoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new TableV2(this, 'Post', {
            tableName: 'Sweep-Post',
            billing: Billing.provisioned({
                readCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
                writeCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
            }),
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            globalSecondaryIndexes: [
                {
                    indexName: 'gsi-1-pk',
                    partitionKey: { name: 'pk', type: AttributeType.STRING },
                },
                {
                    indexName: 'gsi-1-sk',
                    partitionKey: { name: 'sk', type: AttributeType.STRING },
                },
            ],
        });
    }
}
