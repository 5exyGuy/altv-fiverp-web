import Character from './Character';
import Inventory from './Inventory';
import { Model } from 'objection';

export default class House extends Model {
    public id!: number;
    public price!: number;
    public locked!: boolean;
    public location!: string;
    public inventories?: Array<Inventory>;
    public character?: Character;

    public static get tableName(): string {
        return 'houses';
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
                    from: 'houses.id',
                    through: {
                        from: 'character_houses.houseId',
                        to: 'character_houses.characterId',
                    },
                    to: 'characters.id',
                },
            },
        };
    }
}
