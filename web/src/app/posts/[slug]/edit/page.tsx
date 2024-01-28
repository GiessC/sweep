'use client';

import EditPostForm from '@/components/posts/EditPostForm';
import { useEditPost, useGetPost } from '@/hooks/usePost';
import Post from '@/models/posts/Post';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface EditPostProps {
    params: { slug: string };
}

const EditPost = ({ params }: EditPostProps) => {
    const { mutateAsync } = useEditPost();
    const { data, isLoading } = useGetPost({ slug: params.slug });
    const post: Post | undefined | null = data?.item;

    return (
        <Box
            className='w-3/5 m-auto mt-20'
            marginTop={10}
        >
            <Card>
                <CardContent>
                    {isLoading || !post ? (
                        <>Loading...</>
                    ) : (
                        <EditPostForm
                            post={post}
                            mutateAsync={mutateAsync}
                        />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditPost;
