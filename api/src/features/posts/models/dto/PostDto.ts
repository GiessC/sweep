import { v4 as uuidv4 } from 'uuid';
import DBDate from '../../../../mapping/DBDate';
import JsonAble from '../../../../db/JsonAble';

export default class PostDto implements JsonAble {
    private static PK_PREFIX = 'POST#';
    private static PK_SUFFIX = '';
    private static SK_PREFIX = 'POST';
    private static SK_SUFFIX = '';
    public readonly pk: string;
    public readonly sk: string;
    public readonly id: string;
    public readonly createdAt: string;
    public readonly author: string;
    public title: string;
    public content: string;
    public updatedAt: string;

    public constructor(
        title: string,
        content: string,
        author: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = uuidv4();
        this.pk = PostDto.getPk(this.id);
        this.sk = PostDto.getSk();
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = DBDate.toDBDate(createdAt ?? new Date());
        this.updatedAt = DBDate.toDBDate(updatedAt ?? new Date());
    }

    public toJson(): Record<string, unknown> {
        return {
            id: this.id,
            pk: this.pk,
            sk: this.sk,
            title: this.title,
            content: this.content,
            author: this.author,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public static getPk(id: string) {
        return `${PostDto.PK_PREFIX}${id}${PostDto.PK_SUFFIX}`;
    }

    public static getSk() {
        return `${PostDto.SK_PREFIX}${PostDto.SK_SUFFIX}`;
    }
}
