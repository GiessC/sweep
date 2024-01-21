import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { PoolConfig } from 'pg';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerContact } from '../config/config.json';
import Database from '../database/Database';
import { version } from '../package.json';
import postsRouter from './routes/post/Post';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sweep API',
            version,
            contact: SwaggerContact,
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
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

const dbConfig: PoolConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    max: 1,
};

export const database = Database.getInstance(dbConfig);

const app: Express = express();
const port: number = isNaN(Number(process.env.PORT))
    ? 5000
    : Number(process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/post', postsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
