import Post from '@/models/posts/Post';
import type EditPostRequest from '@/models/posts/requests/EditPostRequest';
import APIResponse from '../APIResponse';
import { fetchPatch } from '../utils/fetch';

const PATH = '/post';

const EditPost = async (
    request: EditPostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await fetchPatch<EditPostRequest>(
        `${PATH}/${request.slug}`,
        request,
    );
    const body: APIResponse<Post | null> = await response.json();
    if (body.errors && body.errors.length > 0) {
        console.log(body.errors[0], typeof body.errors[0]);
        throw new Error(body.errors[0].msg, {
            cause: body.cause,
        });
    }
    return body;
};

export default EditPost;
