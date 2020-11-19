import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CharacterVehicle } from './CharacterVehicle';

@Index('fk_VehicleProperties_CharacterVehicle', ['characterVehicleId'], {})
@Entity('vehicleproperties', { schema: 'fiverp' })
export class VehicleProperties {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'characterVehicleId' })
    characterVehicleId: number;

    @ManyToOne(() => CharacterVehicle, (charactervehicle) => charactervehicle.vehicleProperties, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterVehicleId', referencedColumnName: 'id' }])
    characterVehicle: CharacterVehicle;
}
