import Post from '@/models/posts/Post';
import axios from 'axios';
import APIResponse from '../APIResponse';
import GetAllPostsRequest from '@/models/posts/requests/GetAllPostsRequest';

const BASE_URL = `${process.env.API_URL}/post`;

const GetAllPosts = async (
    request: GetAllPostsRequest,
): Promise<APIResponse<Post[]>> => {
    const response = await axios.patch<APIResponse<Post[]>>(BASE_URL, request);
    return response.data;
};

export default GetAllPosts;
