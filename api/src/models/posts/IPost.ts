import Model from '../Model';

export default interface IPost extends Model {
    title: string;
    content: string;
    creator?: string;
    creatorId: number;
    createdAt?: Date;
    lastUpdatedAt?: Date;
}
