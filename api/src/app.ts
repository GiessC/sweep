import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        info: {
            title: 'Sweep API',
            version,
            contact: {
                email: 'giesscollin@gmail.com',
                name: 'Collin Giess',
            },
            description: 'API for the sweep social media apps',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        basePath: '/api',
        consumes: ['application/json'],
        host: 'localhost:5000',
        produces: ['application/json'],
        schemes: ['http', 'https'],
        swagger: '2.0',
    },
    apis: ['app.ts'],
    swaggerDefinition: {},
};
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
 * @swagger
 * /:
 *   get:
 *     description: Hello World
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', async (request: Request, response: Response) => {
    // await new PostRepository().getAll();
    response.send('Hello World!');
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
