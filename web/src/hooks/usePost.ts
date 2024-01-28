import type APIResponse from '@/api/APIResponse';
import CreatePost from '@/api/posts/CreatePost';
import DeletePost from '@/api/posts/DeletePost';
import EditPost from '@/api/posts/EditPost';
import GetAllPosts from '@/api/posts/GetAllPosts';
import GetPost from '@/api/posts/GetPost';
import type Post from '@/models/posts/Post';
import type CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import type DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import type EditPostRequest from '@/models/posts/requests/EditPostRequest';
import type GetPostRequest from '@/models/posts/requests/GetPostRequest';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreatePost = () => {
    return useMutation<APIResponse<Post | null>, Error, CreatePostRequest>({
        mutationFn: (request: CreatePostRequest) => {
            return CreatePost(request);
        },
    });
};

export const useEditPost = () => {
    return useMutation<APIResponse<Post | null>, Error, EditPostRequest>({
        mutationFn: (request: EditPostRequest) => {
            return EditPost(request);
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
