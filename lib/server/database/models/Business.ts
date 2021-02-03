import Character from './Character';
import Inventory from './Inventory';
import { Model } from 'objection';

export default class Business extends Model {
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

    public static relationMappings() {
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
