import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import {
    AttributeType,
    Billing,
    Capacity,
    TableV2,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DynamoStack extends Stack {
    readonly postsTable: TableV2;
    readonly usersTable: TableV2;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.postsTable = new TableV2(this, 'Post', {
            tableName: 'Sweep-Post',
            billing: Billing.provisioned({
                readCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
                writeCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
            }),
            deletionProtection: false,
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            sortKey: { name: 'sk', type: AttributeType.STRING },
            globalSecondaryIndexes: [
                {
                    indexName: 'gsi-1-pk',
                    partitionKey: { name: 'pk', type: AttributeType.STRING },
                    sortKey: { name: 'sk', type: AttributeType.STRING },
                },
                {
                    indexName: 'gsi-1-sk',
                    partitionKey: { name: 'sk', type: AttributeType.STRING },
                },
            ],
            removalPolicy: RemovalPolicy.DESTROY,
        });

        this.usersTable = new TableV2(this, 'User', {
            tableName: 'Sweep-User',
            billing: Billing.provisioned({
                readCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
                writeCapacity: Capacity.autoscaled({ maxCapacity: 10 }),
            }),
            deletionProtection: false,
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            sortKey: { name: 'sk', type: AttributeType.STRING },
            globalSecondaryIndexes: [
                {
                    indexName: 'gsi-1-pk',
                    partitionKey: { name: 'pk', type: AttributeType.STRING },
                    sortKey: { name: 'sk', type: AttributeType.STRING },
                },
                {
                    indexName: 'gsi-1-sk',
                    partitionKey: { name: 'sk', type: AttributeType.STRING },
                },
            ],
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}
