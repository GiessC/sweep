import { Kysely, LogEvent } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import { DB } from './types';

const db = new Kysely<DB>({
    dialect: new PostgresJSDialect({
        postgres: postgres({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            max: 10,
        }),
    }),
    log(event: LogEvent): void {
        if (event.level === 'error') {
            console.error(event.error);
        }
    },
    plugins: [],
});

export default db;
