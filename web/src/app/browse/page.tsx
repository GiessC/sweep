import { useGetAllPosts } from '@/hooks/usePost';
import Post from '@/models/posts/Post';
import GetAllPostsRequest from '@/models/posts/requests/GetAllPostsRequest';
import { useState } from 'react';

const Browse = () => {
    const { data: posts, error, isLoading } = useGetAllPosts({});
    const {} = posts;

    return (
        <div>
            {posts.map((post: Post) => (
                <Post post={post} />
            ))}
        </div>
    );
};

export default Browse;
