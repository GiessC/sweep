import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import { DELETE_SUCCESS } from '../../../types/SuccessMessages';
import IPostRepository from '../repositories/IPostRepository';
import PostRepository from '../repositories/PostRepository';
import ErrorHandler from '../services/ErrorHandler';
import { validateRequest } from '../../../utils/validation/validation';

const deletePostHandler = async (request: Request, response: Response) => {
    validateRequest(request, response);

    const repository: IPostRepository = PostRepository.getInstance();
    try {
        const deleted: boolean = await repository.delete(request.params.slug);
        const body: APIResponseBody<boolean> = {
            message: DELETE_SUCCESS('Post'),
            item: deleted,
        };
        response.status(StatusCodes.OK).send(body);
    } catch (error: unknown) {
        ErrorHandler.handleError(error, response);
    }
};

export default deletePostHandler;
