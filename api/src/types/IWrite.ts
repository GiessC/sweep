export default interface IWrite<T> {
    create(item: T): Promise<void>;
    update(id: number, item: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
