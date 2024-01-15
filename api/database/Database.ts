import pgPromise from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

const options: pgPromise.IInitOptions = {};

const pgp = pgPromise(options);
const connection: IConnectionParameters = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
};
export default pgp(connection);
