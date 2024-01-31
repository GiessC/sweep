import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import {
    AttributeType,
    Billing,
    Capacity,
    TableV2,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DynamoStack extends Stack {
    readonly usersTable;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.usersTable = this.createDynamoTable('User', 'Sweep-User');
        new CfnOutput(this, 'UsersTableArn', {
            value: this.usersTable.tableArn,
        });
        this.createDynamoTable('Post', 'Sweep-Post');
    }

    private createDynamoTable(id: string, tableName: string): TableV2 {
        return new TableV2(this, id, {
            tableName,
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
