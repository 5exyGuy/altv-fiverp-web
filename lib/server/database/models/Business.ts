import Character from './Character';
import Inventory from './Inventory';
import { Model, RelationMappings } from 'objection';

export default class BusinessModel extends Model {
    public id!: number;
    public price!: number;
    public locked!: boolean;
    public location!: string;
    public inventories?: Inventory[];
    public character?: Character;

    public static get tableName(): string {
        return 'businesses';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings(): RelationMappings {
        return {
            character: {
                relation: Model.ManyToManyRelation,
                modelClass: Character,
                join: {
                    from: 'businesses.id',
                    through: {
                        from: 'character_businesses.businessId',
                        to: 'character_businesses.characterId',
                    },
                    to: 'characters.id',
                },
            },
        };
    }
}
