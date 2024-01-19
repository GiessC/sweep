export default interface DatabaseProvider<T> {
    create(item: T): Promise<void>;
    update(id: number, item: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
}
