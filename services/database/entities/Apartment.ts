import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { ApartmentInventory } from './ApartmentInventory';
import { CharacterApartment } from './CharacterApartment';

@Entity('Apartment', { schema: 'test' })
export class Apartment extends BaseEntity {
    @Column('int', { name: 'price' })
    price: number;

    @Column('varchar', { name: 'lockState', length: 255 })
    lockState: string;

    @Column('json', { name: 'location' })
    location: object;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => ApartmentInventory, (apartmentInventory) => apartmentInventory.fkApartment)
    apartmentInventories: ApartmentInventory[];

    @OneToMany(() => CharacterApartment, (characterApartment) => characterApartment.fkApartment)
    characterApartments: CharacterApartment[];
}
