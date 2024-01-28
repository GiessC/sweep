import APIResponse from '../APIResponse';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import ErrorHandler from '../services/ErrorHandler';
import { fetchDelete } from '../utils/fetch';

const PATH = '/post';

const DeletePost = async (
    request: DeletePostRequest,
): Promise<APIResponse<boolean>> => {
    try {
        const response = await fetchDelete<DeletePostRequest>(
            `${PATH}/${request.slug}`,
        );
        return await response.json();
    } catch (error: unknown) {
        return ErrorHandler.handleError(error);
    }
};

export default DeletePost;
