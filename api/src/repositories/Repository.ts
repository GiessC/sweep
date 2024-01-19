import { database } from '../app';
import IRead from './interfaces/IRead';
import IWrite from './interfaces/IWrite';

export type Collection = 'Users' | 'Posts';

export default abstract class Repository<T> implements IWrite<T>, IRead<T> {
    private readonly _collectionName: Collection;

    public constructor(collectionName: Collection) {
        this._collectionName = collectionName;
    }

    public async create(item: T): Promise<void> {
        try {
            if (!item) return;
            const result = await database
                .insertInto(this._collectionName)
                .values([item])
                .executeTakeFirst();
            console.log(item, result);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    public async update(id: number, item: T): Promise<boolean> {
        try {
            if (!id || !item) return false;
            const result = await database
                .updateTable(this._collectionName)
                .set(item)
                .where('id', '=', id)
                .executeTakeFirst();
            console.log(item, result);
            return true;
        } catch (error: unknown) {
            console.log(error);
            return false;
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id) return Promise.resolve(false);
            const result = await database
                .deleteFrom(this._collectionName)
                .where('id', '=', id)
                .executeTakeFirst();
            console.log(id, result);
            return true;
        } catch (error: unknown) {
            console.log(error);
            return false;
        }
    }

    public async findAll(): Promise<T[]> {
        try {
            const result = (await database
                .selectFrom(this._collectionName)
                .selectAll()
                .execute()) as T[];
            console.log(result);
            return result;
        } catch (error: unknown) {
            console.log(error);
            return [];
        }
    }

    public async findOne(id: number): Promise<T | null> {
        try {
            const result = (await database
                .selectFrom(this._collectionName)
                .where('id', '=', id)
                .selectAll()
                .execute()) as T;
            console.log(result);
            return result;
        } catch (error: unknown) {
            console.log(error);
            return null;
        }
    }
}
