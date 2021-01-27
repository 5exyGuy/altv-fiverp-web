import { Model } from 'objection';
import Character from './Character';

export default class Faction extends Model {
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

    public static relationMappings() {
        return {
            character: {
                relation: Model.BelongsToOneRelation,
                modelClass: Character,
                join: {
                    from: 'factions.character_id',
                    to: 'characters.id',
                },
            },
        };
    }
}
