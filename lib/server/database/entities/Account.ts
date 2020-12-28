import Entity from '../Entity';
import User from './User';

export default class Account extends Entity<Account> {
    public compoundId: string;
    public providerType: string;
    public providerId: string;
    public providerAccountId: string;
    public refreshToken: string;
    public accessToken: string;
    public accessTokenExpires: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public id: number;
    public fkUserId: number;
    public fkUser: User;
}
