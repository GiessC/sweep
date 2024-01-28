export interface APIError {
    fields: string[];
    location: string;
    msg: string;
    nestedErrors: unknown[];
    path: string;
    type: string;
    value: unknown;
}

export default interface APIResponse<T> {
    message: string;
    item?: T;
    items?: T[];
    errors?: APIError[];
}
