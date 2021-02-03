import Character from './Character';
import Inventory from './Inventory';
import { Model, RelationMappings } from 'objection';

export default class ApartmentModel extends Model {
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

    public static relationMappings(): RelationMappings {
        return {
            character: {
                relation: Model.ManyToManyRelation,
                modelClass: Character,
                join: {
                    from: 'apartments.id',
                    through: {
                        from: 'character_apartments.apartmentId',
                        to: 'character_apartments.characterId',
                    },
                    to: 'characters.id',
                },
            },
        };
    }
}
