import Post from '@/models/posts/Post';
import UpdatePostRequest from '@/models/posts/requests/UpdatePostRequest';
import axios from 'axios';
import APIResponse from '../APIResponse';

const BASE_URL = `${process.env.API_URL}/post`;

const UpdatePost = async (
    request: UpdatePostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await axios.patch<APIResponse<Post | null>>(
        `${BASE_URL}/${request.id}`,
        request,
    );
    return response.data;
};

export default UpdatePost;
