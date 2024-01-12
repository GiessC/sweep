import Model from '../../models/Model';
import Database from '../Database';
import Repository from '../Repository';

export default class PostRepository implements Repository {
    public async getAll(): Promise<Model[]> {
        const response = await Database.getInstance().any(
            'SELECT * FROM Posts',
        );
        console.log(response);

        return Promise.resolve([]);
    }

    public get(id: string): Promise<Model> {
        return Promise.resolve({});
    }

    public insert(data: unknown): Promise<void> {
        return Promise.resolve();
    }

    public update(id: string, newData: unknown): Promise<void> {
        return Promise.resolve();
    }

    public delete(id: string): Promise<void> {
        return Promise.resolve();
    }
}

