import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { NOT_FOUND } from '../../../types/ErrorMessages';
import { UPDATE_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import PostEdit from '../models/requests/PostEdit';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';

const editPostHandler = async (request: Request, response: Response) => {
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
    const post: Post | null = await repository.edit(
        request.params.slug,
        new PostEdit(requestBody.title, requestBody.content),
    );
    if (!post) {
        const body: APIResponseBody<null> = {
            message: NOT_FOUND('Post', 'slug'),
        };
        response.status(StatusCodes.BAD_REQUEST).send(body);
        return;
    }

    const body: APIResponseBody<Post> = {
        message: UPDATE_SUCCESS('Post'),
        item: post,
    };
    response.status(StatusCodes.OK).send(body);
};

export default editPostHandler;
