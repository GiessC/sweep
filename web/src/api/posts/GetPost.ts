import Post from '@/models/posts/Post';
import APIResponse from '../APIResponse';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import ErrorHandler from '../services/ErrorHandler';
import { fetchGet } from '../utils/fetch';

const PATH = '/post';

const GetPost = async (
    request: GetPostRequest,
): Promise<APIResponse<Post | null>> => {
    try {
        const response = await fetchGet<GetPostRequest>(
            `${PATH}/${request.slug}`,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default GetPost;
