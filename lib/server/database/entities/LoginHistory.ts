import Entity from '../Entity';
import User from './User';

export default class LoginHistory extends Entity<LoginHistory> {
    private _date: Date;
    private _ip: string;
    private _socialId: string;
    private _hwidExHash: string;
    private _hwidHash: string;
    private _id: number;
    private _userId: number;
    private _user: User;
}
