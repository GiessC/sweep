import IRead from './interfaces/IRead';
import IWrite from './interfaces/IWrite';

export type Collection = 'Users' | 'Posts';

export default abstract class Repository<T> implements IWrite<T>, IRead<T> {
    private readonly _collectionName: Collection;

    public constructor(collectionName: Collection) {
        this._collectionName = collectionName;
    }

    async create(item: T): Promise<void> {
        try {
            if (!item) return;
            // const result = await db
            //     .insertInto(this._collectionName)
            //     .values([item])
            //     .executeTakeFirst();
            console.log(item);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    update(id: string, item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    find(item: T): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    findOne(id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }
}
