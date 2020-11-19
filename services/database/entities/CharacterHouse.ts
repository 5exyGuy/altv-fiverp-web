import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { House } from './House';
import { Character } from './Character';
import { HouseInventory } from './HouseInventory';

@Index('fk_Houses_Characters', ['characterId'], {})
@Index('fk_CharacterHouse_House', ['houseId'], {})
@Entity('characterhouse', { schema: 'fiverp' })
export class CharacterHouse {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'houseId' })
    houseId: number;

    @Column('int', { name: 'characterId' })
    characterId: number;

    @ManyToOne(() => House, (house) => house.characterHouses, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'houseId', referencedColumnName: 'id' }])
    house: House;

    @ManyToOne(() => Character, (character) => character.characterHouses, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterId', referencedColumnName: 'id' }])
    character: Character;

    @OneToMany(() => HouseInventory, (houseinventory) => houseinventory.characterHouse)
    houseInventories: HouseInventory[];
}
