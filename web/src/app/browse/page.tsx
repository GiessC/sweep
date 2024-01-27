'use client';

import Post from '@/components/posts/Post';
import { useGetAllPosts } from '@/hooks/usePost';
import type IPost from '@/models/posts/Post';
import { Stack } from '@mui/material';

const Browse = () => {
    const { data } = useGetAllPosts();

    return (
        <>
            <Stack
                spacing={2}
                sx={{ marginLeft: 20, marginRight: 20 }}
            >
                {data?.items?.map((post: IPost) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))}
            </Stack>
        </>
    );
};

export default Browse;
