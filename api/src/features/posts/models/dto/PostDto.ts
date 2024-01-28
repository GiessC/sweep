import { v4 as uuidv4 } from 'uuid';
import DBDate from '../../../../mapping/DBDate';
import JsonAble from '../../../../db/JsonAble';

const generateSlug = (title: string, id: string) => {
    return `${title.toLocaleLowerCase().split(' ').join('-')}-u-${id}`;
};

export default class PostDto implements JsonAble {
    static readonly #PK_PREFIX = 'Post-';
    static readonly #SK_PREFIX = '';
    public readonly pk: string;
    public readonly sk: string;
    public readonly id: string;
    public readonly slug: string;
    public readonly createdAt: string;
    public readonly author: string;
    public readonly authorId: string;
    public title: string;
    public content: string;
    public updatedAt: string;

    public constructor(
        title: string,
        content: string,
        author: string,
        authorId: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = uuidv4();
        this.title = title;
        this.slug = generateSlug(this.title, this.id);
        this.pk = PostDto.getPk(this.id);
        this.sk = PostDto.getSk(this.slug);
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.createdAt = DBDate.toDBDate(createdAt ?? new Date());
        this.updatedAt = DBDate.toDBDate(updatedAt ?? new Date());
    }

    public toJson(): Record<string, unknown> {
        return {
            id: this.id,
            pk: this.pk,
            sk: this.sk,
            slug: this.slug,
            title: this.title,
            content: this.content,
            author: this.author,
            authorId: this.authorId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public static getPk(id: string) {
        return `${PostDto.#PK_PREFIX}${id}`;
    }

    public static getSk(slug: string) {
        return `${PostDto.#SK_PREFIX}${slug}`;
    }
}
