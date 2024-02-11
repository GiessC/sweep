import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import postsRouter from './routes/post/Post';
import setupPostgres from './setup/postgres/PostgresSetup';
import openapiSpecification from './setup/swagger/SwaggerSetup';

if (process.env.NODE_ENV == 'local') {
    dotenv.config({ path: '.env.local' });
} else if (process.env.NODE_ENV == 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

export const postgres = setupPostgres();

const app: Express = express();
const port: number = isNaN(Number(process.env.PORT))
    ? 5000
    : Number(process.env.PORT);
app.use(
    express.json({
        limit: '50mb',
    }),
);
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    }),
);
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }),
);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/post', postsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
