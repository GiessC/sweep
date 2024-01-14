import IPost from './IPost';

export default class Post implements IPost {
    private readonly _title: string;
    private readonly _creator: string;
    private readonly _creatorId: number;
    private readonly _createdAt: Date;
    private _content: string;
    private _lastUpdatedAt: Date;

    public constructor(
        title: string,
        content: string,
        creatorId: number,
        creator?: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this._title = title;
        this._content = content;
        if (!creator) {
            this._creator = ''; // TODO: Replace this with creatorId lookup
        } else {
            this._creator = creator;
        }
        this._creatorId = creatorId;
        this._createdAt = createdAt ?? new Date();
        this._lastUpdatedAt = updatedAt ?? new Date();
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get creator(): string {
        return this._creator;
    }

    public get creatorId(): number {
        return this._creatorId;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get lastUpdatedAt(): Date {
        return this._lastUpdatedAt;
    }
}
