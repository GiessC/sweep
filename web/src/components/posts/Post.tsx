import type Post from '@/models/posts/Post';
import { Typography } from '@mui/material';

export interface PostProps {
    post: Post;
}

const Post = ({ post }: PostProps) => {
    return (
        <div className='flex flex-col'>
            <div>
                <Typography component='h2'>{post.title}</Typography>
            </div>
            <div className='flex flex-row'>
                <div></div>
                <div>
                    <Typography component='p'>{post.content}</Typography>
                </div>
            </div>
            <div>
                <Typography component='sub'>{post.author}</Typography>
            </div>
        </div>
    );
};

export default Post;
