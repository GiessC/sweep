export default interface IWrite<T> {
    create(item: T): Promise<void>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
