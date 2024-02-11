import {
    postDtoArrayToDomain,
    postDtoToDomain,
} from '../mapping/PostDtoMapping';
import Post from '../models/domain/Post';
import PostDto from '../models/dto/PostDto';
import PostCreate from '../models/requests/PostCreate';
import PostEdit from '../models/requests/PostEdit';
import IPostDBProvider, {
    getPostDBProvider,
} from '../providers/IPostDBProvider';
import IPostRepository from './IPostRepository';

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
        const postDto: PostDto | null = await this.databaseProvider.findOne(
            slug,
        );
        if (!postDto) return null;
        return postDtoToDomain(postDto);
    }

    public async create(request: PostCreate): Promise<Post | null> {
        const postDto = new PostDto(
            request.title,
            request.content,
            request.author,
            request.authorId,
        );
        const newPostDto = await this.databaseProvider.create(postDto);
        if (!newPostDto) return null;
        return postDtoToDomain(newPostDto);
    }

    public async edit(slug: string, request: PostEdit): Promise<Post | null> {
        const newPostDto = await this.databaseProvider.edit(slug, request);
        if (!newPostDto) return null;
        return postDtoToDomain(newPostDto);
    }

    public async delete(slug: string): Promise<boolean> {
        return await this.databaseProvider.delete(slug);
    }

    public static getInstance(): PostRepository {
        const dbProvider = getPostDBProvider();
        if (!PostRepository._instance) {
            PostRepository._instance = new PostRepository(dbProvider);
        }
        return PostRepository._instance;
    }
}
