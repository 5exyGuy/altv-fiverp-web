import { Model } from 'objection';
import Character from './Character';
import Inventory from './Inventory';

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
                        from: 'character_houses.house_id',
                        to: 'character_houses.character_id',
                    },
                    to: 'characters.id',
                },
            },
        };
    }
}
