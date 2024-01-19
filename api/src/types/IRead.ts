export default interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
}
