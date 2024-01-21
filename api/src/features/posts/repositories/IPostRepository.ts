import Post from '../models/domain/Post';
import PostCreate from '../models/requests/PostCreate';
import PostUpdate from '../models/requests/PostUpdate';

export default interface IPostRepository {
    getAll(): Promise<Post[]>;
    get(id: string): Promise<Post | null>;
    create(request: PostCreate): Promise<Post | null>;
    update(id: string, request: PostUpdate): Promise<Post | null>;
    delete(id: string): Promise<boolean>;
}
