import Entity from '../Entity';
import User from './User';

export default class Session extends Entity<Session> {
    private _expires: Date;
    private _sessionToken: string;
    private _accessToken: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _id: number;
    private _userId: number;
    private _user: User;
}
