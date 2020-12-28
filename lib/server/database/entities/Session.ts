import Entity from '../Entity';
import User from './User';

export default class Session extends Entity<Session> {
    public expires: Date;
    public sessionToken: string;
    public accessToken: string;
    public createdAt: Date;
    public updatedAt: Date;
    public id: number;
    public fkUserId: number;
    public fkUser: User;
}
