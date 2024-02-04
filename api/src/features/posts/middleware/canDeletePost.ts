import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type APIResponseBody from '../../../routes/APIResponseBody';
import type { JwtPayload } from '../../../utils/jwt/jwt';
import { decodeJwt, getTokenFromHeaders } from '../../../utils/jwt/jwt';
import { getPostDBProvider } from '../providers/IPostDBProvider';
import PostRepository from '../repositories/PostRepository';

const canDeletePost = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
        const body: APIResponseBody<null> = {
            message: 'You are not authorized to perform this action.',
        };
        response.status(StatusCodes.UNAUTHORIZED).send(body);
        return;
    }
    const decoded = decodeJwt(token);
    if (!decoded) {
        const body: APIResponseBody<null> = {
            message: 'You are not authorized to perform this action.',
        };
        response.status(StatusCodes.UNAUTHORIZED).send(body);
        return;
    }
    const payload: JwtPayload = decoded.payload as JwtPayload;
    const roles = payload['roles'];
    if (roles.includes('Admin')) {
        // TODO: Community moderators are allowed as well
        next();
        return;
    }
    const userId = payload['sub'];
    const postRepository = PostRepository.getInstance(getPostDBProvider());
    const post = await postRepository.get(request.params.slug);
    if (!post) {
        const body: APIResponseBody<null> = {
            message: 'Could not find post.',
        };
        response.status(StatusCodes.NOT_FOUND).send(body);
        return;
    }
    if (post.authorId !== userId) {
        const body: APIResponseBody<null> = {
            message: 'You do not have permission to perform this action.',
        };
        response.status(StatusCodes.FORBIDDEN).send(body);
        return;
    }
    next();
};

export default canDeletePost;
