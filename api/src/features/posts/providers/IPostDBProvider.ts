import DBProvider from '../../../../config/dbProviders';
import IRead from '../../../types/IRead';
import IWrite from '../../../types/IWrite';
import PostDto from '../models/dto/PostDto';
import PostCreate from '../models/requests/PostCreate';
import PostEdit from '../models/requests/PostEdit';
import PostDynamoDBProvider from './PostDynamoDBProvider';

export default interface IPostDBProvider
    extends IRead<PostDto>,
        IWrite<PostDto, PostCreate, PostEdit> {}

const DBProviderMap = {
    [DBProvider.DYNAMO_DB]: PostDynamoDBProvider,
};

export const getPostDBProvider = (): IPostDBProvider => {
    if (!process.env.DB_PROVIDER)
        throw new Error('Must provide DB_PROVIDER in environment variables');
    console.log(`Using DBProvider: ${process.env.DB_PROVIDER}`);
    const provider = process.env.DB_PROVIDER as unknown as DBProvider;
    return DBProviderMap[provider].getInstance();
};
