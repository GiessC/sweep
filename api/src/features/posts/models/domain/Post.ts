export default class Post {
    public readonly id: string;
    public readonly title: string;
    public readonly content: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly author: string;

    constructor(
        id: string,
        title: string,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        author: string,
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
    }
}
