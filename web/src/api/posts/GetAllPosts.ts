import Post from '@/models/posts/Post';
import APIResponse from '../APIResponse';
import { fetchGet } from '../utils/fetch';

const PATH = '/post';

const GetAllPosts = async (): Promise<APIResponse<Post[]>> => {
    const response = await fetchGet(PATH);
    const body: APIResponse<Post[]> = await response.json();
    if (body.errors && body.errors.length > 0) {
        console.log(body.errors[0], typeof body.errors[0]);
        throw new Error(body.errors[0].msg, {
            cause: body.cause,
        });
    }
    return body;
};

export default GetAllPosts;
