import Post from '@/models/posts/Post';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { fetchGet } from '../utils/fetch';

const PATH = '/post';

const GetAllPosts = async (): Promise<APIResponse<Post>> => {
    try {
        const response = await fetchGet(PATH);
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default GetAllPosts;
