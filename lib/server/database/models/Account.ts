import User from './User';
import { Model, RelationMappings } from 'objection';

export default class AccountModel extends Model {
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

    public static relationMappings(): RelationMappings {
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
