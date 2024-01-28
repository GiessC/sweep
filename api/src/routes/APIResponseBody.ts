import type { ValidationError } from 'express-validator';

export default interface APIResponseBody<T = unknown> {
    message: string;
    item?: T;
    items?: T[];
    errors?: ValidationError[];
}
