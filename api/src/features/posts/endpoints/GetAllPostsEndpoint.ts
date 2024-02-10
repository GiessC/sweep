import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { GET_ALL_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';

const getAllPostsHandler = async (request: Request, response: Response) => {
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
    const posts = await repository.getAll();

    const body: APIResponseBody<Post> = {
        message: GET_ALL_SUCCESS('Post'),
        items: posts,
    };
    response.status(StatusCodes.OK).send(body);
};

export default getAllPostsHandler;
