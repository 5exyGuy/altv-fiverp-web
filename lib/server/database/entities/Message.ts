import { Model } from 'objection';
import Character from './Character';

export default class Message extends Model {
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

    public static relationMappings() {
        return {
            sender: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'messages.sender_id',
                    to: 'characters.id',
                },
            },
            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'messages.receiver_id',
                    to: 'characters.id',
                },
            },
        };
    }
}
