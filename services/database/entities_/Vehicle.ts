import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { CharacterVehicle } from './CharacterVehicle';

@Entity('Vehicle', { schema: 'test' })
export class Vehicle extends BaseEntity {
    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('binary', { name: 'hash', length: 1 })
    hash: Buffer;

    @Column('int', { name: 'price' })
    price: number;

    @Column('varchar', { name: 'manufacturer', length: 255 })
    manufacturer: string;

    @Column('tinyint', { name: 'seats' })
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

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => CharacterVehicle, (characterVehicle) => characterVehicle.fkVehicle)
    characterVehicles: CharacterVehicle[];
}
