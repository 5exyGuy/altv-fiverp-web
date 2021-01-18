import Entity from '../Entity';
import User from './User';

export default class Account extends Entity<Account> {
    private _compoundId: string;
    private _providerType: string;
    private _providerId: string;
    private _providerAccountId: string;
    private _refreshToken: string;
    private _accessToken: string;
    private _accessTokenExpires: Date;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _id: number;
    private _userId: number;
    private _user: User;

    public constructor(init) {
        super(init);
    }
}
