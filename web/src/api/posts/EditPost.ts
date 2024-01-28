import Post from '@/models/posts/Post';
import type EditPostRequest from '@/models/posts/requests/EditPostRequest';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { fetchPatch } from '../utils/fetch';

const PATH = '/post';

const EditPost = async (
    request: EditPostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await fetchPatch<EditPostRequest>(
            `${PATH}/${request.slug}`,
            request,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default EditPost;
