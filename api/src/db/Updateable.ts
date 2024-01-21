import { AttributeValueUpdate } from '@aws-sdk/client-dynamodb';

export default interface Updateable {
    getUpdated(): Record<string, AttributeValueUpdate>;
}
