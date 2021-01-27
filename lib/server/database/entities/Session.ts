import { Model } from 'objection';
import User from './User';

export default class Session extends Model {
    public id!: number;
    public expires!: Date;
    public sessionToken!: string;
    public accessToken!: string;
    public user!: User;

    public static get tableName(): string {
        return 'sessions';
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
                    from: 'sessions.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}
