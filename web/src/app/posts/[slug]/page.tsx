'use client';

import FullPost from '@/components/posts/[slug]/FullPost';
import { useGetPost } from '@/hooks/usePost';
import Post from '@/models/posts/Post';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import { Box } from '@mui/material';

interface FullPostProps {
    params: GetPostRequest;
}

const FullPostPage = ({ params }: FullPostProps) => {
    const { slug } = params;
    const { data, isLoading } = useGetPost({
        slug,
    });

    const post: Post | undefined | null = data?.item;

    return (
        <Box className='m-8'>
            <FullPost
                post={post}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default FullPostPage;
