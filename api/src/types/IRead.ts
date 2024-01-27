export interface IFindOneOptions {
    id?: string;
    slug?: string;
}

export default interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(options: IFindOneOptions): Promise<T | null>;
}
