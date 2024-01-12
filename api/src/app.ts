import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import PostRepository from './repositories/posts/PostRepository';

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

app.get('/', async (request: Request, response: Response) => {
    await new PostRepository().getAll();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

