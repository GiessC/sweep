import dotenv from 'dotenv';
import express, { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';
import posts from './routes/Post';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
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
    },
    apis: ['./src/routes/*.ts'],
};
const openapiSpecification = swaggerJSDoc(swaggerOptions);

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

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/post', posts);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
