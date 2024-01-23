import Post from '@/models/posts/Post';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { axiosPost } from '../utils/axiosHelpers';

const PATH = '/post';

const CreatePost = async (
    request: CreatePostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await axiosPost<APIResponse<Post | null>>(
            PATH,
            request,
        );
        return response.data;
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default CreatePost;
