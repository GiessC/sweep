import {
    DeleteItemCommand,
    DynamoDB as DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { StatusCodes } from 'http-status-codes';
import DynamoDB from '../../../db/DynamoDB';
import DBDate from '../../../mapping/DBDate';
import {
    mapFromDynamo,
    mapFromDynamoArray,
    mapToDynamo,
} from '../../../utils/dynamoDb/DynamoDBUtils';
import PostDto from '../models/dto/PostDto';
import PostCreate from '../models/requests/PostCreate';
import PostEdit from '../models/requests/PostEdit';
import IPostDBProvider from './IPostDBProvider';

const getIdFromSlug = (slug: string) => {
    const slugSplit = slug.split('-u-');
    return slugSplit[slugSplit.length - 1];
};

export default class PostDynamoDBProvider implements IPostDBProvider {
    private static readonly TABLE_NAME = 'Sweep-Post';
    private static _instance: PostDynamoDBProvider;
    private _dynamoDb: DynamoDBClient;

    public constructor() {
        this._dynamoDb = DynamoDB.getInstance();
    }

    public async findAll(): Promise<PostDto[]> {
        const response = await this._dynamoDb.send(
            new ScanCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
            }),
        );
        if (!response.Items) return [];
        return mapFromDynamoArray<PostDto>(response.Items);
    }

    public async findOne(slug: string): Promise<PostDto | null> {
        const id = getIdFromSlug(slug);
        try {
            const response = await this._dynamoDb.send(
                new GetItemCommand({
                    TableName: PostDynamoDBProvider.TABLE_NAME,
                    Key: {
                        pk: { S: PostDto.getPk(id) },
                        sk: { S: PostDto.getSk(slug) },
                    },
                }),
            );
            if (!response.Item) return null;
            return mapFromDynamo<PostDto>(response.Item);
        } catch (error) {
            console.log(error);
            if (
                error instanceof Error &&
                error.name === 'ValidationException'
            ) {
                console.log('Validation exception');
            }
            return null;
        }
    }

    public async create(item: PostCreate): Promise<PostDto | null> {
        const postDto = new PostDto(
            item.title,
            item.content,
            'GetThisFromJWTToken',
            'GetThisFromJWTToken',
        );
        await this._dynamoDb.send(
            new PutItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Item: mapToDynamo(postDto),
            }),
        );
        const getResponse = await this._dynamoDb.send(
            new GetItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(postDto.id) },
                    sk: { S: PostDto.getSk(postDto.slug) },
                },
            }),
        );
        const createdItem = getResponse.Item;
        if (!createdItem) return null;
        return mapFromDynamo<PostDto>(createdItem);
    }

    public async edit(slug: string, item: PostEdit): Promise<PostDto | null> {
        const id = getIdFromSlug(slug);
        const [updateExpression, expressionValues] = item.getEdited(
            item.title,
            item.content,
        );
        const getResponse = await this._dynamoDb.send(
            new GetItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(id) },
                    sk: { S: PostDto.getSk(slug) },
                },
            }),
        );
        if (!getResponse.Item) return null;
        const updatedPostDto = mapFromDynamo<PostDto>(getResponse.Item);
        await this._dynamoDb.send(
            new UpdateItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(id) },
                    sk: { S: PostDto.getSk(slug) },
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionValues,
            }),
        );
        updatedPostDto.updatedAt = DBDate.toDBDate(new Date());
        updatedPostDto.title = item.title ?? updatedPostDto.title;
        updatedPostDto.content = item.content ?? updatedPostDto.content;

        return updatedPostDto;
    }

    public async delete(slug: string): Promise<boolean> {
        const id = getIdFromSlug(slug);
        const response = await this._dynamoDb.send(
            new DeleteItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(id) },
                    sk: { S: PostDto.getSk(slug) },
                },
            }),
        );
        return response.$metadata.httpStatusCode === StatusCodes.OK;
    }

    public static getInstance(): PostDynamoDBProvider {
        if (!PostDynamoDBProvider._instance) {
            PostDynamoDBProvider._instance = new PostDynamoDBProvider();
        }
        return PostDynamoDBProvider._instance;
    }
}
