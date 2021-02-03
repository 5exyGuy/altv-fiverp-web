import Character from './Character';
import { Model, RelationMappings } from 'objection';

export default class Contact extends Model {
    public id!: number;
    public holder!: Character;
    public contact!: Character;

    public static get tableName(): string {
        return 'contacts';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings(): RelationMappings {
        return {
            holder: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'contacts.holderId',
                    to: 'characters.id',
                },
            },
            contact: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'contacts.contactId',
                    to: 'characters.id',
                },
            },
        };
    }
}
