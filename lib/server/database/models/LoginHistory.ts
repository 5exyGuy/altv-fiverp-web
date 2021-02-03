import User from './User';
import { Model, RelationMappings } from 'objection';

export default class LoginHistoryModel extends Model {
    public id!: number;
    public date!: Date;
    public ip!: string;
    public socialId!: string;
    public hwidExHash!: string;
    public hwidHash!: string;
    public user!: User;

    public static get tableName(): string {
        return 'login_histories';
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
                    from: 'login_histories.userId',
                    to: 'users.id',
                },
            },
        };
    }
}
