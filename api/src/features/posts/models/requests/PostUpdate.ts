import { AttributeValue } from '@aws-sdk/client-dynamodb';
import DBDate from '../../../../mapping/DBDate';
import UpdateExpressionBuilder from '../../../../models/UpdateExpressionBuilder';

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
