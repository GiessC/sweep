import Post from '@/models/posts/Post';
import axios from 'axios';
import APIResponse from '../APIResponse';
import GetAllPostsRequest from '@/models/posts/requests/GetAllPostsRequest';
import ErrorHandler from '../services/ErrorHandler';

const PATH = '/post';

const GetAllPosts = async (
    request: GetAllPostsRequest,
): Promise<APIResponse<Post[]>> => {
    try {
        const response = await axios.patch<APIResponse<Post[]>>(PATH, request);
        return response.data;
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default GetAllPosts;
