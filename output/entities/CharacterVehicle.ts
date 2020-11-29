import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import Vehicle from "./Vehicle";
import Character from "./Character";
import VechileInventory from "./VechileInventory";
import VehicleProperties from "./VehicleProperties";

@Index("fk_Character_id", ["fkCharacterId"], {})
@Index("fk_Vehicle_id", ["fkVehicleId"], {})
@Entity("CharacterVehicle")
export default class CharacterVehicle {
  @Column("tinyint", { name: "destroyed", width: 1 })
  public destroyed!: boolean;

  @Column("json", { name: "lastPosition" })
  public lastPosition!: object;

  @Column("json", { name: "lastRotation" })
  public lastRotation!: object;

  @Column("tinyint", { name: "fuel" })
  public fuel!: number;

  @Column("int", { name: "dimension" })
  public dimension!: number;

  @Column("varchar", { name: "lockState", length: 255 })
  public lockState!: string;

  @Column("varchar", { name: "numberPlate", length: 255 })
  public numberPlate!: string;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Vehicle_id" })
  public fkVehicleId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.characterVehicles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Vehicle_id", referencedColumnName: "id" }])
  public fkVehicle!: Promise<Vehicle>;

  @ManyToOne(() => Character, (character) => character.characterVehicles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;

  @OneToMany(
    () => VechileInventory,
    (vechileInventory) => vechileInventory.fkCharacterVehicle,
    { lazy: true }
  )
  public vechileInventories!: Promise<VechileInventory[]>;

  @OneToOne(
    () => VehicleProperties,
    (vehicleProperties) => vehicleProperties.fkCharacterVehicle,
    { lazy: true }
  )
  public vehicleProperties!: Promise<VehicleProperties>;
}
