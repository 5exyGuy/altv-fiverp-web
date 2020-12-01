import Inventory from '../entities/Inventory';
import InventoryItem from '../entities/InventoryItem';
import Item from '../entities/Item';
import EntityBuilder from '../EntityBuilder';
import InventoryBuilder from './InventoryBuilder';
import ItemBuilder from './ItemBuilder';

export default class InventoryItemBuilder extends EntityBuilder {
    protected _entity: InventoryItem;

    public setSlot(slot: number): InventoryItemBuilder {
        this._entity.slot = slot;
        return this;
    }

    public setAmount(amount: number): InventoryItemBuilder {
        this._entity.amount = amount;
        return this;
    }

    public setId(id: number): InventoryItemBuilder {
        this._entity.id = id;
        return this;
    }

    public setItemId(id: number): InventoryItemBuilder {
        this._entity.fk_Item_id = id;
        return this;
    }

    public setInventoryId(id: number): InventoryItemBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): InventoryItemBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }

    public setItem(item: Item | ItemBuilder): InventoryItemBuilder {
        if (item instanceof ItemBuilder) item = <Item>item.build();
        this._entity.Item = item;
        return this;
    }
}
