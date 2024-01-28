export default interface IWrite<T, C, U> {
    create(item: C): Promise<T | null>;
    edit(id: string, item: U): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
