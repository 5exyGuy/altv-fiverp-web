import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Vehicle } from './Vehicle';
import { Character } from './Character';
import { VechileInventory } from './VechileInventory';
import { VehicleProperties } from './VehicleProperties';

@Index('fk_Character_id', ['fkCharacterId'], {})
@Index('fk_Vehicle_id', ['fkVehicleId'], {})
@Entity('CharacterVehicle', { schema: 'test' })
export class CharacterVehicle extends BaseEntity {
    @Column('tinyint', { name: 'destroyed', width: 1 })
    destroyed: boolean;

    @Column('json', { name: 'lastPosition' })
    lastPosition: object;

    @Column('json', { name: 'lastRotation' })
    lastRotation: object;

    @Column('tinyint', { name: 'fuel' })
    fuel: number;

    @Column('int', { name: 'dimension' })
    dimension: number;

    @Column('varchar', { name: 'lockState', length: 255 })
    lockState: string;

    @Column('varchar', { name: 'numberPlate', length: 255 })
    numberPlate: string;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Vehicle_id' })
    fkVehicleId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.characterVehicles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Vehicle_id', referencedColumnName: 'id' }])
    fkVehicle: Vehicle;

    @ManyToOne(() => Character, (character) => character.characterVehicles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;

    @OneToMany(() => VechileInventory, (vechileInventory) => vechileInventory.fkCharacterVehicle)
    vechileInventories: VechileInventory[];

    @OneToOne(() => VehicleProperties, (vehicleProperties) => vehicleProperties.fkCharacterVehicle)
    vehicleProperties: VehicleProperties;
}
