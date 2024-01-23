import Post from '@/models/posts/Post';
import axios from 'axios';
import APIResponse from '../APIResponse';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import ErrorHandler from '../services/ErrorHandler';

const PATH = '/post';

const GetPost = async (
    request: GetPostRequest,
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

export default GetPost;
