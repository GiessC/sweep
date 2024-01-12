import Model from '../models/Model';

export default interface Repository {
    getAll?: () => Promise<Model[]>;
    get: (id: string) => Promise<Model>;
    insert?: (data: unknown) => Promise<void>;
    update?: (id: string, newData: unknown) => Promise<void>;
    delete?: (id: string) => Promise<void>;
}

