import Post from '@/models/posts/Post';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import axios from 'axios';
import APIResponse from '../APIResponse';
import ErrorHandler from '../services/ErrorHandler';
import { axiosPost } from '../utils/axiosHelpers';

const BASE_ENDPOINT = '/post';

const CreatePost = async (
    request: CreatePostRequest,
): Promise<APIResponse<Post | null>> => {
    console.log('Base URL:');
    try {
        const response = await axiosPost<APIResponse<Post | null>>(
            BASE_ENDPOINT,
            request,
        );
        return response.data;
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default CreatePost;
