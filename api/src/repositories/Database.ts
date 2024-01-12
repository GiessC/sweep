const pgp = require('pg-promise')();

export default class Database {
    private static readonly CONNECTION =
        'postgres://username:password@host:port/database';
    private static database?: Database;
    private db: any;

    public constructor() {
        this.db = pgp(Database.CONNECTION);
    }

    public static getInstance(): any {
        if (!Database.database) {
            Database.database = new Database();
        }
        return Database.database.db;
    }
}

