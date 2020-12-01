import InventoryItem from '../entities/InventoryItem';
import Item from '../entities/Item';
import EntityBuilder from '../EntityBuilder';
import InventoryItemBuilder from './InventoryItemBuilder';

export default class ItemBuilder extends EntityBuilder {
    protected _entity: Item;

    public setName(name: string): ItemBuilder {
        this._entity.name = name;
        return this;
    }

    public setHash(hash: string): ItemBuilder {
        this._entity.hash = hash;
        return this;
    }

    public setWeight(weight: number): ItemBuilder {
        this._entity.weight = weight;
        return this;
    }

    public setId(id: number): ItemBuilder {
        this._entity.id = id;
        return this;
    }

    public addInventoryItem(inventoryItem: InventoryItem | InventoryItemBuilder): InventoryBuilder {
        if (!this._entity.InventoryItem) this._entity.InventoryItem = new Array<InventoryItem>();
        if (inventoryItem instanceof InventoryItemBuilder) inventoryItem = <InventoryItem>inventoryItem.build();
        this._entity.InventoryItem.push(inventoryItem);
        return this;
    }
}
