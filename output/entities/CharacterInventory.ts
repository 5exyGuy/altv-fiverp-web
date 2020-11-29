import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Inventory from "./Inventory";
import Character from "./Character";

@Index("fk_Character_id", ["fkCharacterId"], {})
@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Entity("CharacterInventory")
export default class CharacterInventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.characterInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;

  @ManyToOne(() => Character, (character) => character.characterInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;
}
