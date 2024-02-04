import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { NOT_FOUND, UNKNOWN } from '../../../types/ErrorMessages';
import { GET_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';
import ErrorHandler from '../services/ErrorHandler';

const getPostHandler = async (request: Request, response: Response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        const body: APIResponseBody<Post | null> = {
            message: 'One or more errors occurred.',
            errors: result.array(),
        };
        response.status(StatusCodes.BAD_REQUEST).send(body);
        return;
    }
    const repository: IPostRepository = PostRepository.getInstance(
        getPostDBProvider(),
    );
    try {
        const post: Post | null = await repository.get(request.params.slug);
        if (!post) {
            const body: APIResponseBody<null> = {
                message: NOT_FOUND('Post', 'slug'),
            };
            response.status(StatusCodes.NOT_FOUND).send(body);
            return;
        }

        const body: APIResponseBody<Post> = {
            message: GET_SUCCESS('Post'),
            item: post,
        };
        response.status(StatusCodes.OK).send(body);
    } catch (error: unknown) {
        ErrorHandler.handleError(error);
        const body: APIResponseBody<null> = {
            message: UNKNOWN(),
        };
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(body);
    }
};

export default getPostHandler;
