'use client';

import type IPost from '@/models/posts/Post';
import TextSafety from '@/services/input/TextSafety';
import { CardContent, Divider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface PostProps {
    post: IPost;
}

const Post = ({ post }: PostProps) => {
    const router = useRouter();

    const goToPost = () => {
        router.push(`/posts/${post.slug}`);
    };

    return (
        <Card
            className='first:mt-8 last:mb-8 cursor-pointer'
            variant='outlined'
            onClick={goToPost}
        >
            <CardContent className='last:pb-2 p-2'>
                <Typography variant='h6'>
                    {TextSafety.fromEscaped(post.title)}
                </Typography>
                <Divider orientation='horizontal' />
                <Typography
                    className=''
                    variant='body1'
                >
                    {TextSafety.fromEscaped(post.content)}
                </Typography>
                <Link
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className='hover:underline text-gray-500'
                    href={`/profile/${post.authorId}`}
                >
                    {TextSafety.fromEscaped(post.author)}
                </Link>
            </CardContent>
        </Card>
    );
};

export default Post;
