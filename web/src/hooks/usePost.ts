import type APIResponse from '@/api/APIResponse';
import CreatePost from '@/api/posts/CreatePost';
import DeletePost from '@/api/posts/DeletePost';
import GetAllPosts from '@/api/posts/GetAllPosts';
import GetPost from '@/api/posts/GetPost';
import UpdatePost from '@/api/posts/UpdatePost';
import type Post from '@/models/posts/Post';
import type CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import type GetPostRequest from '@/models/posts/requests/GetPostRequest';
import UpdatePostRequest from '@/models/posts/requests/UpdatePostRequest';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, CreatePostRequest>({
        mutationFn: (request: CreatePostRequest) => {
            return CreatePost(request);
        },
    });
};

export const useUpdatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, UpdatePostRequest>({
        mutationFn: (request: UpdatePostRequest) => {
            return UpdatePost(request);
        },
    });
};

export const useGetPost = (request: GetPostRequest) => {
    return useQuery({
        queryKey: ['post', request.slug],
        queryFn: () => {
            return GetPost(request);
        },
    });
};

export const useGetAllPosts = () => {
    return useQuery<{}, Error, APIResponse<Post>>({
        queryKey: ['posts'],
        queryFn: () => {
            return GetAllPosts();
        },
    });
};

export const useDeletePost = () => {
    return useMutation<APIResponse<boolean>, Error, DeletePostRequest>({
        mutationKey: ['posts'],
        mutationFn: (request: DeletePostRequest) => {
            return DeletePost(request);
        },
    });
};
