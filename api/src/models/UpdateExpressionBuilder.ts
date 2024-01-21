import { AttributeValue } from '@aws-sdk/client-dynamodb';

export default class UpdateExpressionBuilder {
    private expression: string;
    private expressionAttributeValues: Record<string, AttributeValue>;

    public constructor() {
        this.expression = '';
        this.expressionAttributeValues = {};
    }

    public addExpression(
        key: string,
        value: AttributeValue,
        expression: string,
    ) {
        if (!this.expression) {
            this.expression = `SET ${expression}`;
            this.expressionAttributeValues[key] = value;
            return;
        }
        this.expression += `, ${expression}`;
        this.expressionAttributeValues[key] = value;
    }

    public getExpression(): [string, Record<string, AttributeValue>] {
        return [this.expression, this.expressionAttributeValues];
    }
}
