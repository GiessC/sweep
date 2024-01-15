import Post from '../../models/posts/Post';
import Repository from '../Repository';
import db from '../../../database/Database';

export default class PostRepository extends Repository<Post> {
    private static readonly TABLE_NAME: string = 'Posts';

    constructor() {
        super();
    }

    public countUserPosts = (userId: number): Promise<number> => {
        return db.one('SELECT COUNT(1) FROM Posts WHERE creatorId=($1)', [
            userId,
        ]);
    };
}
