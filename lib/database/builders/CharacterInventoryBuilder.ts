import Character from '../entities/Character';
import CharacterInventory from '../entities/CharacterInventory';
import Inventory from '../entities/Inventory';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';
import InventoryBuilder from './InventoryBuilder';

export default class CharacterInventoryBuilder extends EntityBuilder {
    protected _entity: CharacterInventory;

    public setId(id: number): CharacterInventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setInventoryId(id: number): CharacterInventoryBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterInventoryBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterInventoryBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): CharacterInventoryBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }
}
