import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { CREATE_SUCCESS } from '../../../types/SuccessMessages';
import {
    JwtPayload,
    decodeJwt,
    getTokenFromHeaders,
} from '../../../utils/jwt/jwt';
import Post from '../models/domain/Post';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';

const createPostHandler = async (request: Request, response: Response) => {
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
        return;
    }
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        return;
    }
    const payload: JwtPayload = decodedToken.payload as JwtPayload;
    const userId = payload['sub'] as string;
    const username = payload['cognito:username'];
    const requestBody = await request.body;
    const result = validationResult(request);
    if (!result.isEmpty()) {
        const body: APIResponseBody<Post | null> = {
            message: 'One or more errors occurred.',
            errors: result.array(),
        };
        response.status(StatusCodes.BAD_REQUEST).send(body);
        return;
    }

    const repository: IPostRepository = PostRepository.getInstance();
    const post: Post | null = await repository.create({
        title: requestBody.title,
        content: requestBody.content,
        author: username,
        authorId: userId,
    });

    const body: APIResponseBody<Post | null> = {
        message: CREATE_SUCCESS('Post'),
        item: post,
    };
    response.status(StatusCodes.OK).send(body);
};

export default createPostHandler;
