export default interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
}
