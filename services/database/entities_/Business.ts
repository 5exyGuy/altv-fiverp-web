import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { BusinessInventory } from './BusinessInventory';
import { CharacterBusiness } from './CharacterBusiness';

@Entity('Business', { schema: 'test' })
export class Business extends BaseEntity {
    @Column('int', { name: 'price' })
    price: number;

    @Column('varchar', { name: 'lockState', length: 255 })
    lockState: string;

    @Column('json', { name: 'location' })
    location: object;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => BusinessInventory, (businessInventory) => businessInventory.fkBusiness)
    businessInventories: BusinessInventory[];

    @OneToMany(() => CharacterBusiness, (characterBusiness) => characterBusiness.fkBusiness)
    characterBusinesses: CharacterBusiness[];
}
