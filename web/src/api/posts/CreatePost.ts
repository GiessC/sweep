import Post from '@/models/posts/Post';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import axios from 'axios';
import APIResponse from '../APIResponse';

const BASE_URL = `${process.env.API_URL}/post`;

const CreatePost = async (
    request: CreatePostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await axios.post<APIResponse<Post | null>>(
        BASE_URL,
        request,
    );
    return response.data;
};

export default CreatePost;
