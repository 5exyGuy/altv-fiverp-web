import { Column, Entity, OneToMany } from 'typeorm';
import { CharacterBusiness } from './CharacterBusiness';

@Entity('business', { schema: 'fiverp' })
export class Business {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'price' })
    price: number;

    @Column('tinyint', { name: 'lockState' })
    lockState: number;

    @Column('varchar', { name: 'zone', length: 255 })
    zone: string;

    @Column('varchar', { name: 'street', length: 255 })
    street: string;

    @OneToMany(() => CharacterBusiness, (characterbusiness) => characterbusiness.business)
    characterBusinesses: CharacterBusiness[];
}
