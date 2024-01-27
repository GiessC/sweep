import Post from '@/models/posts/Post';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { fetchPost } from '../utils/fetch';

const PATH = '/post';

const CreatePost = async (
    request: CreatePostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await fetchPost<CreatePostRequest>(
            PATH,
            request,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default CreatePost;
