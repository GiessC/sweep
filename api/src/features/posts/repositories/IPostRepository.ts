import { Posts as Post } from '../../../../database/types';

export interface CreatePostRequest {
    title: string;
    content: string;
}

export interface UpdatePostRequest {
    title?: string;
    content?: string;
}

export default interface IPostRepository {
    getAll(): Promise<Post[]>;
    get(id: number): Promise<Post | null>;
    create(request: CreatePostRequest): Promise<void>;
    update(id: number, request: UpdatePostRequest): Promise<void>;
    delete(id: number): Promise<void>;
}
