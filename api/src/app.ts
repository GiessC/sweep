import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import PostRepository from './repositories/posts/PostRepository';

const swaggerOptions = {};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

if (process.env.NODE_ENV == 'local') {
    dotenv.config({ path: '.env.local' });
} else if (process.env.NODE_ENV == 'production') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.development' });
}

const app: Express = express();
const port: number = isNaN(Number(process.env.PORT))
    ? 5000
    : Number(process.env.PORT);

/**
 * @openapi
 * /:
 *   get:
 *     description: Hello World
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', async (request: Request, response: Response) => {
    await new PostRepository().getAll();
    response.send('Hello World!');
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
