import Post from '@/models/posts/Post';
import APIResponse from '../APIResponse';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import { fetchGet } from '../utils/fetch';

const PATH = '/post';

const GetPost = async (
    request: GetPostRequest,
): Promise<APIResponse<Post | null>> => {
    const response = await fetchGet<GetPostRequest>(`${PATH}/${request.slug}`);
    const body: APIResponse<Post | null> = await response.json();
    if (body.errors && body.errors.length > 0) {
        console.log(body.errors[0], typeof body.errors[0]);
        throw new Error(body.errors[0].msg, {
            cause: body.cause,
        });
    }
    return body;
};

export default GetPost;
