import Post from '@/models/posts/Post';
import UpdatePostRequest from '@/models/posts/requests/UpdatePostRequest';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { fetchPatch } from '../utils/fetch';

const PATH = '/post';

const UpdatePost = async (
    request: UpdatePostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await fetchPatch<UpdatePostRequest>(
            PATH,
            request,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default UpdatePost;
