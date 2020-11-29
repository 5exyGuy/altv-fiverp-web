import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import CharacterVehicle from "./CharacterVehicle";

@Index("fk_CharacterVehicle_id", ["fkCharacterVehicleId"], { unique: true })
@Entity("VehicleProperties")
export default class VehicleProperties {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_CharacterVehicle_id", unique: true })
  public fkCharacterVehicleId!: number;

  @OneToOne(
    () => CharacterVehicle,
    (characterVehicle) => characterVehicle.vehicleProperties,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION", lazy: true }
  )
  @JoinColumn([{ name: "fk_CharacterVehicle_id", referencedColumnName: "id" }])
  public fkCharacterVehicle!: Promise<CharacterVehicle>;
}
