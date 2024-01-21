import DynamoDB from '../../../db/DynamoDB';
import {
    mapToDynamo,
    mapFromDynamoArray,
    mapFromDynamo,
} from '../../../utils/DynamoDBUtils';
import {
    DeleteItemCommand,
    DynamoDB as DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import IPostDBProvider from './IPostDBProvider';
import PostDto from '../models/dto/PostDto';
import PostUpdate from '../models/requests/PostUpdate';
import PostCreate from '../models/requests/PostCreate';
import { StatusCodes } from 'http-status-codes';
import DBDate from '../../../mapping/DBDate';

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

    public async findOne(id: string): Promise<PostDto | null> {
        const response = await this._dynamoDb.send(
            new GetItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: {
                        S: PostDto.getPk(id),
                    },
                },
            }),
        );
        if (!response.Item) return null;
        return mapFromDynamo<PostDto>(response.Item);
    }

    public async create(item: PostCreate): Promise<PostDto | null> {
        const postDto = new PostDto(
            item.title,
            item.content,
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
                Key: { pk: { S: PostDto.getPk(postDto.id) } },
            }),
        );
        const createdItem = getResponse.Item;
        if (!createdItem) return null;
        return mapFromDynamo<PostDto>(createdItem);
    }

    public async update(id: string, item: PostUpdate): Promise<PostDto | null> {
        const [updateExpression, expressionValues] = item.getUpdated(
            item.title,
            item.content,
        );
        const getResponse = await this._dynamoDb.send(
            new GetItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(id) },
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

    public async delete(id: string): Promise<boolean> {
        const response = await this._dynamoDb.send(
            new DeleteItemCommand({
                TableName: PostDynamoDBProvider.TABLE_NAME,
                Key: {
                    pk: { S: PostDto.getPk(id) },
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
