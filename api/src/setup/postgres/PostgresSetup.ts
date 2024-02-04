import type { PoolConfig } from 'pg';
import Database from '../../../database/Database';

const setupPostgres = () => {
    const dbConfig: PoolConfig = {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        max: 1,
    };
    return Database.getInstance(dbConfig);
};

export default setupPostgres;
