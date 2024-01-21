import axios from 'axios';
import APIResponse from '../APIResponse';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';

const BASE_URL = `${process.env.API_URL}/post`;

const DeletePost = async (
    request: DeletePostRequest,
): Promise<APIResponse<boolean>> => {
    const response = await axios.patch<APIResponse<boolean>>(BASE_URL, request);
    return response.data;
};

export default DeletePost;
