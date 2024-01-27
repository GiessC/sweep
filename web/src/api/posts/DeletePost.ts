import APIResponse from '../APIResponse';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import ErrorHandler from '../services/ErrorHandler';
import { fetchDelete } from '../utils/fetch';

const PATH = '/post';

const DeletePost = async (
    request: DeletePostRequest,
): Promise<APIResponse<boolean>> => {
    try {
        console.log(request);
        const response = await fetchDelete<DeletePostRequest>(
            `${PATH}/${request.id}`,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default DeletePost;
