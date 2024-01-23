import axios from 'axios';
import APIResponse from '../APIResponse';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import ErrorHandler from '../services/ErrorHandler';

const PATH = '/post';

const DeletePost = async (
    request: DeletePostRequest,
): Promise<APIResponse<boolean>> => {
    try {
        const response = await axios.patch<APIResponse<boolean>>(PATH, request);
        return response.data;
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default DeletePost;
