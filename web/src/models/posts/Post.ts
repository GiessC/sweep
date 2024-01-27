export default interface Post {
    id: string;
    slug: string; // "title-separated-with-hyphens-post.id" // This is more human readable and SEO optimized
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    authorId: string;
}
