export default class Post {
    public readonly id: string;
    public readonly title: string;
    public readonly slug: string;
    public readonly content: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly author: string;
    public readonly authorId: string;

    constructor(
        id: string,
        title: string,
        slug: string,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        author: string,
        authorId: string,
    ) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
        this.authorId = authorId;
    }
}
