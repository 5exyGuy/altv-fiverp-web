import { Column, Entity, OneToMany } from "typeorm";
import ApartmentInventory from "./ApartmentInventory";
import BusinessInventory from "./BusinessInventory";
import CharacterInventory from "./CharacterInventory";
import HouseInventory from "./HouseInventory";
import InventoryItem from "./InventoryItem";
import VechileInventory from "./VechileInventory";

@Entity("Inventory")
export default class Inventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(
    () => ApartmentInventory,
    (apartmentInventory) => apartmentInventory.fkInventory,
    { lazy: true }
  )
  public apartmentInventories!: Promise<ApartmentInventory[]>;

  @OneToMany(
    () => BusinessInventory,
    (businessInventory) => businessInventory.fkInventory,
    { lazy: true }
  )
  public businessInventories!: Promise<BusinessInventory[]>;

  @OneToMany(
    () => CharacterInventory,
    (characterInventory) => characterInventory.fkInventory,
    { lazy: true }
  )
  public characterInventories!: Promise<CharacterInventory[]>;

  @OneToMany(
    () => HouseInventory,
    (houseInventory) => houseInventory.fkInventory,
    { lazy: true }
  )
  public houseInventories!: Promise<HouseInventory[]>;

  @OneToMany(
    () => InventoryItem,
    (inventoryItem) => inventoryItem.fkInventory,
    { lazy: true }
  )
  public inventoryItems!: Promise<InventoryItem[]>;

  @OneToMany(
    () => VechileInventory,
    (vechileInventory) => vechileInventory.fkInventory,
    { lazy: true }
  )
  public vechileInventories!: Promise<VechileInventory[]>;
}
