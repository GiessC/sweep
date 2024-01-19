import { Kysely, PostgresDialect } from 'kysely';
import { Pool, PoolConfig } from 'pg';
import { DB } from './types';

export default class Database {
    private static _instance: Database;
    private database: Kysely<DB>;

    constructor(dbConfig: PoolConfig) {
        this.database = new Kysely<DB>({
            dialect: new PostgresDialect({
                pool: new Pool(dbConfig),
            }),
            plugins: [],
        });
    }

    public static getInstance(dbConfig: PoolConfig): Kysely<DB> {
        if (!Database._instance) {
            Database._instance = new Database(dbConfig);
        }

        return Database._instance.database;
    }
}
