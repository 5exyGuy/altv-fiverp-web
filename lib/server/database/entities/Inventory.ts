import { Model } from 'objection';
import Item from './Item';

export default class Inventory extends Model {
    public id!: number;
    public items?: Array<Item>;

    public static get tableName(): string {
        return 'inventories';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings() {
        return {
            character: {
                relation: Model.HasManyRelation,
                modelClass: Item,
                join: {
                    from: 'inventories.id',
                    through: {
                        from: 'character_apartments.inventoryId',
                        to: 'character_apartments.itemId',
                    },
                    to: 'items.id',
                },
            },
        };
    }
}
