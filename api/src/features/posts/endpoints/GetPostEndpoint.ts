import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { GET_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';
import ErrorHandler from '../services/ErrorHandler';
import { validateRequest } from '../../../utils/validation/validation';

const getPostHandler = async (request: Request, response: Response) => {
    validateRequest(request, response);

    const repository: IPostRepository = PostRepository.getInstance();
    try {
        const post: Post | null = await repository.get(request.params.slug);
        const body: APIResponseBody<Post | null> = {
            message: GET_SUCCESS('Post'),
            item: post,
        };
        response.status(StatusCodes.OK).send(body);
    } catch (error: unknown) {
        ErrorHandler.handleError(error, response);
    }
};

export default getPostHandler;
