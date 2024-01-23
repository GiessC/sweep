import Post from '@/models/posts/Post';
import UpdatePostRequest from '@/models/posts/requests/UpdatePostRequest';
import axios from 'axios';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';

const PATH = '/post';

const UpdatePost = async (
    request: UpdatePostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await axios.patch<APIResponse<Post | null>>(
            PATH,
            request,
        );
        return response.data;
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default UpdatePost;
