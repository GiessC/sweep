import { Request, Response, Router } from 'express';
import { getPostDBProvider } from '../../features/posts/providers/IPostDBProvider';
import type IPostRepository from '../../features/posts/repositories/IPostRepository';
import type APIResponseBody from '../APIResponseBody';
import PostRepository from '../../features/posts/repositories/PostRepository';
import Post from '../../features/posts/models/domain/Post';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import {
    CREATE_SUCCESS,
    DELETE_SUCCESS,
    GET_ALL_SUCCESS,
    GET_SUCCESS,
    UPDATE_SUCCESS,
} from '../../types/SuccessMessages';
import {
    createPostRequestValidators,
    deletePostRequestValidators,
    getAllPostsRequestValidators,
    getPostRequestValidators,
    updatePostRequestValidators,
} from './validators';
import PostUpdate from '../../features/posts/models/requests/PostUpdate';
import { NOT_FOUND, UNKNOWN } from '../../types/ErrorMessages';
import ErrorHandler from '../../features/posts/services/ErrorHandler';

const router: Router = Router();

/**
 * @openapi
 * /post:
 *   post:
 *     parameters:
 *       - name: title
 *         in: body
 *         required: true
 *         type: string
 *       - name: content
 *         in: body
 *         required: true
 *         type: string
 *     tags:
 *       - posts
 *     description: Creates and returns a post
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post(
    '/',
    ...createPostRequestValidators,
    async (request: Request, response: Response) => {
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

        const repository: IPostRepository = PostRepository.getInstance(
            getPostDBProvider(),
        );
        const post: Post | null = await repository.create({
            title: requestBody.title,
            content: requestBody.content,
        });

        const body: APIResponseBody<Post | null> = {
            message: CREATE_SUCCESS('Post'),
            item: post,
        };
        response.status(StatusCodes.OK).send(body);
    },
);

/**
 * @openapi
 * /post:
 *   get:
 *     tags:
 *       - posts
 *     description: Gets all posts
 *     responses:
 *       200:
 *         description: Returns a list of all posts
 */
router.get(
    '/',
    ...getAllPostsRequestValidators,
    async (request: Request, response: Response) => {
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
        const posts = await repository.getAll();

        const body: APIResponseBody<Post> = {
            message: GET_ALL_SUCCESS('Post'),
            items: posts,
        };
        response.status(StatusCodes.OK).send(body);
    },
);

/**
 * @openapi
 * /post/:slug:
 *   get:
 *     tags:
 *       - posts
 *     description: Gets a post by its slug
 *     responses:
 *       200:
 *         description: Returns a single post
 *     parameters:
 *       - in: path
 *         name: slug
 *         type: string
 *         required: true
 *         description: The slug ("human-readable id") of the post.
 */
router.get(
    '/:slug',
    ...getPostRequestValidators,
    async (request: Request, response: Response) => {
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
    },
);

/**
 * @openapi
 * /post/:postId:
 *   patch:
 *     tags:
 *       - posts
 *     description: Updates a post
 *     responses:
 *       200:
 *         description: Updates and returns a post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         type: string
 *         required: true
 *         description: The UUID ID of the post to update.
 *       - in: body
 *         name: title
 *         type: string
 *         description: The updated title of the post.
 *       - in: body
 *         name: content
 *         type: string
 *         description: The updated content of the post.
 */
router.patch(
    '/:postId',
    ...updatePostRequestValidators,
    async (request: Request, response: Response) => {
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
        const repository: IPostRepository = PostRepository.getInstance(
            getPostDBProvider(),
        );
        const post: Post | null = await repository.update(
            request.params.postId,
            new PostUpdate(requestBody.title, requestBody.content),
        );
        if (!post) {
            const body: APIResponseBody<null> = {
                message: NOT_FOUND('Post', 'postId'),
            };
            response.status(StatusCodes.BAD_REQUEST).send(body);
            return;
        }

        const body: APIResponseBody<Post> = {
            message: UPDATE_SUCCESS('Post'),
            item: post,
        };
        response.status(StatusCodes.OK).send(body);
    },
);

/**
 * @openapi
 * /post/:postId:
 *   delete:
 *     tags:
 *       - posts
 *     description: Deletes a post
 *     responses:
 *       200:
 *         description: Deletes a post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         type: string
 *         required: true
 *         description: The UUID ID of the post to delete.
 */
router.delete(
    '/:postId',
    ...deletePostRequestValidators,
    async (request: Request, response: Response) => {
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
        const deleted: boolean = await repository.delete(request.params.postId);

        const body: APIResponseBody<boolean> = {
            message: DELETE_SUCCESS('Post'),
            item: deleted,
        };
        response.status(StatusCodes.OK).send(body);
    },
);

export default router;
