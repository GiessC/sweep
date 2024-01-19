interface IPost {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    author: unknown; // TODO: User
    upvotes: number;
}
