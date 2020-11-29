import { Column, Entity, OneToMany } from "typeorm";
import CharacterVehicle from "./CharacterVehicle";

@Entity("Vehicle")
export default class Vehicle {
  @Column("varchar", { name: "name", length: 255 })
  public name!: string;

  @Column("binary", { name: "hash", length: 1 })
  public hash!: Buffer;

  @Column("int", { name: "price" })
  public price!: number;

  @Column("varchar", { name: "manufacturer", length: 255 })
  public manufacturer!: string;

  @Column("tinyint", { name: "seats" })
  public seats!: number;

  @Column("varchar", { name: "class", length: 255 })
  public class!: string;

  @Column("varchar", { name: "type", length: 255 })
  public type!: string;

  @Column("double", { name: "maxBraking", precision: 22 })
  public maxBraking!: number;

  @Column("double", { name: "maxBrakingMods", precision: 22 })
  public maxBrakingMods!: number;

  @Column("double", { name: "maxSpeed", precision: 22 })
  public maxSpeed!: number;

  @Column("double", { name: "maxTraction", precision: 22 })
  public maxTraction!: number;

  @Column("double", { name: "acceleration", precision: 22 })
  public acceleration!: number;

  @Column("double", { name: "agility", precision: 22 })
  public agility!: number;

  @Column("double", { name: "maxKnots", precision: 22 })
  public maxKnots!: number;

  @Column("double", { name: "moveResistance", precision: 22 })
  public moveResistance!: number;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(
    () => CharacterVehicle,
    (characterVehicle) => characterVehicle.fkVehicle,
    { lazy: true }
  )
  public characterVehicles!: Promise<CharacterVehicle[]>;
}
