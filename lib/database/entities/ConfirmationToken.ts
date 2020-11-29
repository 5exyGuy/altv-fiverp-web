import User from './User';

export default class ConfirmationToken {
    public token: string;
    public id: number;
    public fk_User_id: number;
    public User: User;
}
