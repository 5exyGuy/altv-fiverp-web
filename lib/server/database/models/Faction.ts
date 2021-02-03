import Character from './Character';
import { Model, RelationMappings } from 'objection';

export default class FactionModel extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public members?: Array<Character>;
    public character!: Character;

    public static get tableName(): string {
        return 'factions';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings(): RelationMappings {
        return {
            character: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'factions.characterId',
                    to: 'characters.id',
                },
            },
        };
    }
}
