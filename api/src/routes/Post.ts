import { Request, Response, Router } from 'express';
import PostRepository from '../repositories/posts/PostRepository';

const router: Router = Router();

/**
 * @openapi
 * /post:
 *   get:
 *     tags:
 *       - posts
 *     description: Hello World
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', async (request: Request, response: Response) => {
    response.send('Hello World!');
});

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
 *       - name: authorId
 *         in: body
 *         required: true
 *         type: integer
 *     tags:
 *       - posts
 *     description: Creates a post
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/', async (request: Request, response: Response) => {
    const postRepository = new PostRepository();
    await postRepository.create(request.body);
    response.sendStatus(200);
});

export default router;
