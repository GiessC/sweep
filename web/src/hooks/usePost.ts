import APIResponse from '@/api/APIResponse';
import CreatePost from '@/api/posts/CreatePost';
import type Post from '@/models/posts/Post';
import type CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import { useMutation } from '@tanstack/react-query';

export const useCreatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, CreatePostRequest>({
        mutationFn: async (request: CreatePostRequest) => {
            return await CreatePost(request);
        },
    });
};
