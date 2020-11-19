import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BusinessInventory } from './BusinessInventory';
import { Character } from './Character';
import { Business } from './Business';

@Index('fk_Businesses_Characters', ['characterId'], {})
@Index('fk_CharacterBusiness_Business', ['businessId'], {})
@Entity('characterbusiness', { schema: 'fiverp' })
export class CharacterBusiness {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'businessId' })
    businessId: number;

    @Column('int', { name: 'characterId' })
    characterId: number;

    @OneToMany(() => BusinessInventory, (businessinventory) => businessinventory.characterBusiness)
    businessInventories: BusinessInventory[];

    @ManyToOne(() => Character, (character) => character.characterBusinesses, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterId', referencedColumnName: 'id' }])
    character: Character;

    @ManyToOne(() => Business, (business) => business.characterBusinesses, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'businessId', referencedColumnName: 'id' }])
    business: Business;
}
