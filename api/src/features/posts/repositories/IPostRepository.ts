import Post from '../models/domain/Post';
import PostCreate from '../models/requests/PostCreate';
import PostEdit from '../models/requests/PostEdit';

export default interface IPostRepository {
    getAll(): Promise<Post[]>;
    get(slug: string): Promise<Post | null>;
    create(request: PostCreate): Promise<Post | null>;
    edit(slug: string, request: PostEdit): Promise<Post | null>;
    delete(slug: string): Promise<boolean>;
}
