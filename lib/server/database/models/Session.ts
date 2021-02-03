import User from './User';
import { Model, RelationMappings } from 'objection';

export default class SessionModel extends Model {
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

    public static relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'sessions.userId',
                    to: 'users.id',
                },
            },
        };
    }
}
