import Character from './Character';
import { Model, RelationMappings } from 'objection';

export default class MessageModel extends Model {
    public id!: number;
    public content!: string;
    public date!: Date;
    public sender!: Character;
    public receiver!: Character;

    public static get tableName(): string {
        return 'messages';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings(): RelationMappings {
        return {
            sender: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'messages.senderId',
                    to: 'characters.id',
                },
            },
            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'messages.receiverId',
                    to: 'characters.id',
                },
            },
        };
    }
}
