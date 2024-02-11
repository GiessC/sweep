import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { UPDATE_SUCCESS } from '../../../types/SuccessMessages';
import Post from '../models/domain/Post';
import PostEdit from '../models/requests/PostEdit';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';
import ErrorHandler from '../services/ErrorHandler';
import { validateRequest } from '../../../utils/validation/validation';

const editPostHandler = async (request: Request, response: Response) => {
    const requestBody = await request.body;

    validateRequest(request, response);

    const repository: IPostRepository = PostRepository.getInstance();
    try {
        const post: Post | null = await repository.edit(
            request.params.slug,
            new PostEdit(requestBody.title, requestBody.content),
        );
        const body: APIResponseBody<Post | null> = {
            message: UPDATE_SUCCESS('Post'),
            item: post,
        };
        response.status(StatusCodes.OK).send(body);
    } catch (error: unknown) {
        ErrorHandler.handleError(error, response);
    }
};

export default editPostHandler;
