import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { CharacterVehicle } from './CharacterVehicle';

@Index('fk_CharacterVehicle_id', ['fkCharacterVehicleId'], {})
@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Entity('VechileInventory', { schema: 'test' })
export class VechileInventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @Column('int', { name: 'fk_CharacterVehicle_id' })
    fkCharacterVehicleId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.vechileInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;

    @ManyToOne(() => CharacterVehicle, (characterVehicle) => characterVehicle.vechileInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterVehicle_id', referencedColumnName: 'id' }])
    fkCharacterVehicle: CharacterVehicle;
}
