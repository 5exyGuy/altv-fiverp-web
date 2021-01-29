import { Model } from 'objection';
import User from './User';

export default class ResetPasswordRequest extends Model {
    public id!: number;
    public token!: string;
    public expires!: Date;
    public user!: User;

    public static get tableName(): string {
        return 'reset_password_requests';
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
                    from: 'reset_password_requests.userId',
                    to: 'users.id',
                },
            },
        };
    }
}
