import { Model } from 'objection';
import User from './User';

export default class Account extends Model {
    public id!: number;
    public compoundId!: string;
    public providerType!: string;
    public providerId!: string;
    public providerAccountId!: string;
    public refreshToken?: string;
    public accessToken?: string;
    public accessTokenExpires?: Date;
    public user!: User;

    public static get tableName(): string {
        return 'accounts';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'accounts.userId',
                    to: 'users.id',
                },
            },
        };
    }
}
