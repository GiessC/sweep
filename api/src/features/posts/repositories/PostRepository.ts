import IPostRepository from './IPostRepository';
import DatabaseProvider from '../../../providers/DatabaseProvider';

export default class PostRepository implements IPostRepository {
    private static TABLE_NAME = 'Posts';
    private readonly databaseProvider: DatabaseProvider<Post>;

    public constructor(databaseProvider: DatabaseProvider<Post>) {
        this.databaseProvider = databaseProvider;
    }

    public getAll(): Promise<Post[]> {
        return this.databaseProvider.findAll();
    }

    public get(id: number): Promise<Post | null> {
        return this.databaseProvider.findOne(id);
    }

    public create(request: CreatePostRequest): Promise<void> {
        return this.databaseProvider.create();
    }

    public update(id: number, request: UpdatePostRequest): Promise<void> {}

    public delete(id: number): Promise<void> {}
}
