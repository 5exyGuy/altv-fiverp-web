import Entity from '../Entity';
import User from './User';

export default class LoginHistory extends Entity<LoginHistory> {
    public date: Date;
    public ip: string;
    public socialId: string;
    public hwidExHash: string;
    public hwidHash: string;
    public id: number;
    public fkUserId: number;
    public fkUser: User;
}
