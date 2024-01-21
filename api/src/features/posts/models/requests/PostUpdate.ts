import { AttributeValue, AttributeValueUpdate } from '@aws-sdk/client-dynamodb';
import Updateable from '../../../../db/Updateable';
import DBDate from '../../../../services/DBDate';

class UpdateExpressionBuilder {
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

export default class PostUpdate {
    public readonly title?: string;
    public readonly content?: string;

    public constructor(title?: string, content?: string) {
        this.title = title;
        this.content = content;
    }

    public getUpdated(
        title?: string,
        content?: string,
    ): [string, Record<string, AttributeValue>] {
        const builder = new UpdateExpressionBuilder();
        if (title) {
            builder.addExpression(
                ':title',
                {
                    S: title,
                },
                `title = :title`,
            );
        }
        if (content) {
            builder.addExpression(
                ':content',
                {
                    S: content,
                },
                `content = :content`,
            );
        }
        builder.addExpression(
            ':updatedAt',
            {
                S: DBDate.toDBDate(new Date()),
            },
            'updatedAt = :updatedAt',
        );

        return builder.getExpression();
    }
}
