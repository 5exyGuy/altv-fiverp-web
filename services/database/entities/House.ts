import { Column, Entity, OneToMany } from "typeorm";
import { CharacterHouse } from "./CharacterHouse";

@Entity("house", { schema: "fiverp" })
export class House {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("bigint", { name: "price" })
    price: string;

    @Column("longtext", { name: "location" })
    location: string;

    @Column("tinyint", { name: "lockState" })
    lockState: number;

    @Column("varchar", { name: "zone", length: 255 })
    zone: string;

    @Column("varchar", { name: "street", length: 255 })
    street: string;

    @OneToMany(() => CharacterHouse, (characterhouse) => characterhouse.house)
    characterhouses: CharacterHouse[];
}
