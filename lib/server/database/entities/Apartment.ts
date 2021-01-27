import { Model } from 'objection';
import Character from './Character';
import Inventory from './Inventory';

export default class Apartment extends Model {
    public id!: number;
    public price!: number;
    public locked!: boolean;
    public location!: string;
    public inventories?: Array<Inventory>;
    public character?: Character;

    public static get tableName(): string {
        return 'apartments';
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
                    from: 'apartments.id',
                    through: {
                        from: 'character_apartments.apartment_id',
                        to: 'character_apartments.character_id',
                    },
                    to: 'characters.id',
                },
            },
        };
    }
}
