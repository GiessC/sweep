export default interface Post {
    id?: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    author?: string;
}
