import DBDate from '../../../services/DBDate';
import Post from '../models/domain/Post';
import PostDto from '../models/dto/PostDto';

export const postDtoToDomain = (postDto: PostDto): Post =>
    new Post(
        postDto.id,
        postDto.title,
        postDto.content,
        DBDate.fromDBDate(postDto.createdAt),
        DBDate.fromDBDate(postDto.updatedAt),
        postDto.author,
    );

export const postDtoArrayToDomain = (postDtos: PostDto[]): Post[] => {
    return postDtos.map((postDto: PostDto) => postDtoToDomain(postDto));
};

export const postToDto = (post: Post): PostDto =>
    new PostDto(
        post.title,
        post.content,
        post.author,
        post.createdAt,
        post.updatedAt,
    );
