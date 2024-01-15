import { Request, Response, Router } from 'express';

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

export default router;
