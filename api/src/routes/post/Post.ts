import { Router } from 'express';
import createPostHandler from '../../features/posts/endpoints/CreatePostEndpoint';
import deletePostHandler from '../../features/posts/endpoints/DeletePostEndpoint';
import editPostHandler from '../../features/posts/endpoints/EditPostEndpoint';
import getAllPostsHandler from '../../features/posts/endpoints/GetAllPostsEndpoint';
import getPostHandler from '../../features/posts/endpoints/GetPostEndpoint';
import jwtValidate from '../../middleware/Jwt';
import {
    createPostRequestValidators,
    deletePostRequestValidators,
    editPostRequestValidators,
    getAllPostsRequestValidators,
    getPostRequestValidators,
} from './validators';

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
router.post('/', ...createPostRequestValidators, createPostHandler);

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
    jwtValidate,
    getAllPostsHandler,
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
router.get('/:slug', ...getPostRequestValidators, getPostHandler);

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
 *         name: slug
 *         type: string
 *         required: true
 *         description: The slug of the post to update.
 *       - in: body
 *         name: title
 *         type: string
 *         description: The updated title of the post.
 *       - in: body
 *         name: content
 *         type: string
 *         description: The updated content of the post.
 */
router.patch('/:slug', ...editPostRequestValidators, editPostHandler);

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
 *         name: slug
 *         type: string
 *         required: true
 *         description: The slug of the post to delete.
 */
router.delete('/:slug', ...deletePostRequestValidators, deletePostHandler);

export default router;
