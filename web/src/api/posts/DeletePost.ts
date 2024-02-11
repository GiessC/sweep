import APIResponse from '../APIResponse';
import DeletePostRequest from '@/models/posts/requests/DeletePostRequest';
import { fetchDelete } from '../utils/fetch';

const PATH = '/post';

const DeletePost = async (
    request: DeletePostRequest,
): Promise<APIResponse<boolean>> => {
    const response = await fetchDelete<DeletePostRequest>(
        `${PATH}/${request.slug}`,
    );
    const body: APIResponse<boolean> = await response.json();
    if (body.errors && body.errors.length > 0) {
        console.log(body.errors[0], typeof body.errors[0]);
        throw new Error(body.errors[0].msg, {
            cause: body.cause,
        });
    }
    return body;
};

export default DeletePost;
