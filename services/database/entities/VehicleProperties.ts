import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CharacterVehicle } from './CharacterVehicle';

@Index('fk_CharacterVehicle_id', ['fkCharacterVehicleId'], { unique: true })
@Entity('VehicleProperties', { schema: 'test' })
export class VehicleProperties extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_CharacterVehicle_id', unique: true })
    fkCharacterVehicleId: number;

    @OneToOne(() => CharacterVehicle, (characterVehicle) => characterVehicle.vehicleProperties, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterVehicle_id', referencedColumnName: 'id' }])
    fkCharacterVehicle: CharacterVehicle;
}
