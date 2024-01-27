import Post from '../models/domain/Post';
import {
    postDtoArrayToDomain,
    postDtoToDomain,
} from '../mapping/PostDtoMapping';
import IPostDBProvider from '../providers/IPostDBProvider';
import IPostRepository from './IPostRepository';
import PostDto from '../models/dto/PostDto';
import PostCreate from '../models/requests/PostCreate';
import PostUpdate from '../models/requests/PostUpdate';

export default class PostRepository implements IPostRepository {
    private static _instance: PostRepository;
    private readonly databaseProvider: IPostDBProvider;

    public constructor(databaseProvider: IPostDBProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async getAll(): Promise<Post[]> {
        const postDtos: PostDto[] = await this.databaseProvider.findAll();
        return postDtoArrayToDomain(postDtos);
    }

    public async get(slug: string): Promise<Post | null> {
        const postDto: PostDto | null = await this.databaseProvider.findOne({
            slug,
        });
        if (!postDto) return null;
        return postDtoToDomain(postDto);
    }

    public async create(request: PostCreate): Promise<Post | null> {
        const postDto = new PostDto(
            request.title,
            request.content,
            'GetAuthorFromJWTToken',
            'GetAuthorFromJWTToken',
        );
        const newPostDto = await this.databaseProvider.create(postDto);
        if (!newPostDto) return null;
        return postDtoToDomain(newPostDto);
    }

    public async update(id: string, request: PostUpdate): Promise<Post | null> {
        const newPostDto = await this.databaseProvider.update(id, request);
        if (!newPostDto) return null;
        return postDtoToDomain(newPostDto);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.databaseProvider.delete(id);
    }

    public static getInstance(dbProvider: IPostDBProvider): PostRepository {
        if (!PostRepository._instance) {
            PostRepository._instance = new PostRepository(dbProvider);
        }
        return PostRepository._instance;
    }
}
