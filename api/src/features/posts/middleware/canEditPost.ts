import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import APIResponseBody from '../../../routes/APIResponseBody';
import type { JwtPayload } from '../../../utils/jwt/jwt';
import { decodeJwt, getTokenFromHeaders } from '../../../utils/jwt/jwt';
import PostRepository from '../repositories/PostRepository';

const canEditPost = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
        return;
    }
    const decoded = decodeJwt(token);
    if (!decoded) {
        return;
    }
    const payload: JwtPayload = decoded.payload as JwtPayload;
    const userId = payload['sub'];
    const postRepository = PostRepository.getInstance();
    const post = await postRepository.get(request.params.slug);
    if (!post) {
        const body: APIResponseBody<null> = {
            message: 'Could not find post with the given slug.',
            cause: 'slug',
            errors: [
                {
                    type: 'field',
                    location: 'params',
                    msg: 'Could not find post with the given slug.',
                    path: 'slug',
                    value: request.params.slug,
                },
            ],
        };
        response.status(StatusCodes.NOT_FOUND).send(body);
        return;
    }
    if (post.authorId !== userId) {
        const body: APIResponseBody<null> = {
            message: 'You do not have permission to perform this action.',
            cause: 'Must be author to edit a post.',
            errors: [
                {
                    type: 'alternative',
                    msg: 'You do not have permission to perform this action.',
                    nestedErrors: [],
                },
            ],
        };
        response.status(StatusCodes.FORBIDDEN).send(body);
        return;
    }
    next();
};

export default canEditPost;
