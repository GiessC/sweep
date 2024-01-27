'use client';

import { useGetPost } from '@/hooks/usePost';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import Post from '@/models/posts/Post';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import { useRouter } from 'next/navigation';

interface FullPostProps {
    params: GetPostRequest;
}

const FullPost = ({ params }: FullPostProps) => {
    const router = useRouter();
    const { slug } = params;
    const { data, isLoading, error, isSuccess } = useGetPost({
        slug,
    });
    if (!data?.item) {
        // router.push('/404');
        return;
    }
    const post: Post | undefined | null = data.item;

    return (
        <Box marginTop={10}>
            <Card>
                <CardHeader>{post?.title}</CardHeader>
                <CardContent>{post?.content}</CardContent>
            </Card>
        </Box>
    );
};

export default FullPost;
