import { Column, Entity, OneToMany } from "typeorm";
import { InventoryItem } from "./InventoryItem";

@Entity("item", { schema: "fiverp" })
export class Item {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("varchar", { name: "name", length: 255 })
    name: string;

    @Column("longblob", { name: "hash" })
    hash: Buffer;

    @Column("double", { name: "weight", precision: 22 })
    weight: number;

    @OneToMany(() => InventoryItem, (inventoryitem) => inventoryitem.item)
    inventoryitems: InventoryItem[];
}
