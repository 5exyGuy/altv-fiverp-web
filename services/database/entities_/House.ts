import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { CharacterHouse } from './CharacterHouse';
import { HouseInventory } from './HouseInventory';

@Entity('House', { schema: 'test' })
export class House extends BaseEntity {
    @Column('int', { name: 'price' })
    price: number;

    @Column('varchar', { name: 'lockState', length: 255 })
    lockState: string;

    @Column('json', { name: 'location' })
    location: object;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => CharacterHouse, (characterHouse) => characterHouse.fkHouse)
    characterHouses: CharacterHouse[];

    @OneToMany(() => HouseInventory, (houseInventory) => houseInventory.fkHouse)
    houseInventories: HouseInventory[];
}
