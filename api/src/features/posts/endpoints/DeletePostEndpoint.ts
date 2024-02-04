import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { DELETE_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';

const deletePostHandler = async (request: Request, response: Response) => {
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
    const deleted: boolean = await repository.delete(request.params.slug);

    const body: APIResponseBody<boolean> = {
        message: DELETE_SUCCESS('Post'),
        item: deleted,
    };
    response.status(StatusCodes.OK).send(body);
};

export default deletePostHandler;
