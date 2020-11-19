import { Column, Entity, OneToMany } from 'typeorm';
import { CharacterVehicle } from './CharacterVehicle';

@Entity('vehicle', { schema: 'fiverp' })
export class Vehicle {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('longblob', { name: 'hash' })
    hash: Buffer;

    @Column('bigint', { name: 'price' })
    price: string;

    @Column('varchar', { name: 'manufacturer', length: 255 })
    manufacturer: string;

    @Column('smallint', { name: 'seats' })
    seats: number;

    @Column('varchar', { name: 'class', length: 255 })
    class: string;

    @Column('varchar', { name: 'type', length: 255 })
    type: string;

    @Column('double', { name: 'maxBraking', precision: 22 })
    maxBraking: number;

    @Column('double', { name: 'maxBrakingMods', precision: 22 })
    maxBrakingMods: number;

    @Column('double', { name: 'maxSpeed', precision: 22 })
    maxSpeed: number;

    @Column('double', { name: 'maxTraction', precision: 22 })
    maxTraction: number;

    @Column('double', { name: 'acceleration', precision: 22 })
    acceleration: number;

    @Column('double', { name: 'agility', precision: 22 })
    agility: number;

    @Column('double', { name: 'maxKnots', precision: 22 })
    maxKnots: number;

    @Column('double', { name: 'moveResistance', precision: 22 })
    moveResistance: number;

    @OneToMany(() => CharacterVehicle, (charactervehicle) => charactervehicle.vehicle)
    characterVehicles: CharacterVehicle[];
}
