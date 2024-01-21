import Post from '@/models/posts/Post';
import axios from 'axios';
import APIResponse from '../APIResponse';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';

const BASE_URL = `${process.env.API_URL}/post`;

const GetPost = async (
    request: GetPostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await axios.patch<APIResponse<Post | null>>(
        `${BASE_URL}/${request.id}`,
        request,
    );
    return response.data;
};

export default GetPost;
