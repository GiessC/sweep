import { v4 as uuidv4 } from 'uuid';
import DBDate from '../../../../mapping/DBDate';

export default class UserDto {
    static readonly #PK_PREFIX = 'User-';
    static readonly #SK_PREFIX = '';
    public readonly pk: string;
    public readonly sk: string;
    public readonly id: string;
    public readonly username: string;
    public readonly createdAt: string;
    public readonly updatedAt: string;

    public constructor(username: string, createdAt?: Date, updatedAt?: Date) {
        this.id = uuidv4();
        this.username = username;
        this.pk = UserDto.getPk(this.id);
        this.sk = UserDto.getSk(this.username);
        this.createdAt = DBDate.toDBDate(createdAt ?? new Date());
        this.updatedAt = DBDate.toDBDate(updatedAt ?? new Date());
    }

    public static getPk(id: string): string {
        return `${UserDto.#PK_PREFIX}${id}`;
    }

    public static getSk(username: string): string {
        return `${UserDto.#SK_PREFIX}${username}`;
    }
}
