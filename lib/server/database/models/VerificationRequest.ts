import User from './User';
import { Model } from 'objection';

export default class VerificationRequest extends Model {
    public id!: number;
    public token!: string;
    public expires!: Date;
    public user!: User;

    public static get tableName(): string {
        return 'verification_requests';
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
                    from: 'verification_requests.userId',
                    to: 'users.id',
                },
            },
        };
    }
}
