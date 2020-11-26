export default class LoginHistory {
    private _id: number;
    private _date: Date;
    private _ip: string;
    private _socialId: string;
    private _hwidExHash: number;
    private _hwidHash: number;

    public constructor() {}

    public get id(): number {
        return this._id;
    }

    public get date(): Date {
        return this._date;
    }

    public get ip(): string {
        return this._ip;
    }

    public get socialId(): string {
        return this._socialId;
    }

    public get hwidExHash(): number {
        return this._hwidExHash;
    }

    public get hwidHash(): number {
        return this._hwidHash;
    }
}
