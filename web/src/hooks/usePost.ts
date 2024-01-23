import type APIResponse from '@/api/APIResponse';
import CreatePost from '@/api/posts/CreatePost';
import DeletePost from '@/api/posts/DeletePost';
import GetAllPosts from '@/api/posts/GetAllPosts';
import GetPost from '@/api/posts/GetPost';
import UpdatePost from '@/api/posts/UpdatePost';
import type Post from '@/models/posts/Post';
import type CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import GetAllPostsRequest from '@/models/posts/requests/GetAllPostsRequest';
import type GetPostRequest from '@/models/posts/requests/GetPostRequest';
import UpdatePostRequest from '@/models/posts/requests/UpdatePostRequest';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, CreatePostRequest>({
        mutationFn: async (request: CreatePostRequest) => {
            return await CreatePost(request);
        },
    });
};

export const useUpdatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, UpdatePostRequest>({
        mutationFn: async (request: UpdatePostRequest) => {
            return await UpdatePost(request);
        },
    });
};

export const useGetPost = (request: GetPostRequest) => {
    return useQuery<APIResponse<Post | null>, Error, GetPostRequest>({
        queryKey: ['post', request.id],
        queryFn: () => {
            return GetPost(request);
        },
    });
};

export const useGetAllPosts = (request: GetAllPostsRequest) => {
    return useQuery<GetAllPostsRequest, Error, APIResponse<Post[]>>({
        queryKey: ['posts'],
        queryFn: () => {
            return GetAllPosts(request);
        },
    });
};

export const useDeletePost = (request: DeletePostRequest) => {
    return useQuery<DeletePostRequest, Error, APIResponse<boolean>>({
        queryKey: ['post', request.id],
        queryFn: () => {
            return DeletePost(request);
        },
    });
};
