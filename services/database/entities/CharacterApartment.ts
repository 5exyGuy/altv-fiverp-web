import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { ApartmentInventory } from "./ApartmentInventory";
import { Character } from "./Character";
import { Apartment } from "./Apartment";

@Index("fk_Apartments_Characters", ["characterId"], {})
@Index("fk_CharacterApartment_Apartment", ["apartmentId"], {})
@Entity("characterapartment", { schema: "fiverp" })
export class CharacterApartment {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "apartmentId" })
    apartmentId: number;

    @Column("int", { name: "characterId" })
    characterId: number;

    @OneToMany(
        () => ApartmentInventory,
        (apartmentinventory) => apartmentinventory.characterApartment
    )
    apartmentinventories: ApartmentInventory[];

    @ManyToOne(() => Character, (character) => character.characterapartments, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "characterId", referencedColumnName: "id" }])
    character: Character;

    @ManyToOne(() => Apartment, (apartment) => apartment.characterapartments, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "apartmentId", referencedColumnName: "id" }])
    apartment: Apartment;
}
