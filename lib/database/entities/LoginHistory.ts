import User from './User';

export default class LoginHistory {
    public date: Date;
    public ip: string;
    public socialId: string;
    public hwidExHash: Buffer;
    public hwidHash: Buffer;
    public id: number;
    public fk_User_id: number;
    public User: User;
}
