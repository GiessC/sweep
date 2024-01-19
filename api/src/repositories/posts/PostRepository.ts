import Post from '../../models/posts/Post';
import Repository from '../Repository';

export default class PostRepository extends Repository<Post> {
    constructor() {
        super('Posts');
    }
}
