import { Column, Entity, OneToMany } from "typeorm";
import { CharacterApartment } from "./CharacterApartment";

@Entity("apartment", { schema: "fiverp" })
export class Apartment {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("bigint", { name: "price" })
    price: string;

    @Column("longtext", { name: "location" })
    location: string;

    @Column("tinyint", { name: "lockState" })
    lockState: number;

    @Column("varchar", { name: "zone", length: 255 })
    zone: string | null;

    @Column("varchar", { name: "street", length: 255 })
    street: string | null;

    @OneToMany(
        () => CharacterApartment,
        (characterapartment) => characterapartment.apartment
    )
    characterapartments: CharacterApartment[];
}
