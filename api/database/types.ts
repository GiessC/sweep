import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Posts = {
    id: Generated<number>;
    title: string;
    createdAt: Generated<Timestamp>;
    content: string;
    authorId: number;
};
export type Users = {
    id: Generated<number>;
    username: string;
};
export type DB = {
    Posts: Posts;
    Users: Users;
};
