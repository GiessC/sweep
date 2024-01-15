import { IDatabase } from 'pg-promise';
import IRead from './interfaces/IRead';
import IWrite from './interfaces/IWrite';
import { IClient } from 'pg-promise/typescript/pg-subset';

export default abstract class Repository<T> implements IWrite<T>, IRead<T> {
    create(item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
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
