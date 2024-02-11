import Post from '@/models/posts/Post';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import APIResponse from '../APIResponse';
import { fetchPost } from '../utils/fetch';

const PATH = '/post';

const CreatePost = async (
    request: CreatePostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await fetchPost<CreatePostRequest>(PATH, request);
    const body: APIResponse<Post | null> = await response.json();
    if (body.errors && body.errors.length > 0) {
        console.log(body.errors[0], typeof body.errors[0]);
        throw new Error(body.errors[0].msg, {
            cause: body.cause,
        });
    }
    return body;
};

export default CreatePost;
