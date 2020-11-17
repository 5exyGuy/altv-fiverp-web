import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import { Character } from "./Character";
import { Vehicle } from "./Vehicle";
import { VehicleInventory } from "./VehicleInventory";
import { VehicleProperties } from "./VehicleProperties";

@Index("fk_CharacterVehicle_Vehicle", ["vehicleId"], {})
@Index("fk_CharacterVehicle_Character", ["characterId"], {})
@Entity("charactervehicle", { schema: "fiverp" })
export class CharacterVehicle {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "vehicleId" })
    vehicleId: number;

    @Column("int", { name: "characterId" })
    characterId: number;

    @Column("smallint", { name: "destroyed" })
    destroyed: number;

    @Column("longtext", { name: "position" })
    position: string;

    @Column("longtext", { name: "rotation" })
    rotation: string;

    @Column("smallint", { name: "fuel" })
    fuel: number;

    @Column("int", { name: "dimension" })
    dimension: number;

    @Column("smallint", { name: "lockState" })
    lockState: number;

    @Column("varchar", { name: "numberPlate", length: 255 })
    numberPlate: string;

    @ManyToOne(() => Character, (character) => character.charactervehicles, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "characterId", referencedColumnName: "id" }])
    character: Character;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.charactervehicles, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "vehicleId", referencedColumnName: "id" }])
    vehicle: Vehicle;

    @OneToMany(
        () => VehicleInventory,
        (vehicleinventory) => vehicleinventory.vehicle
    )
    vehicleinventories: VehicleInventory[];

    @OneToOne(
        () => VehicleProperties,
        (vehicleproperties) => vehicleproperties.characterVehicle
    )
    vehicleproperties: VehicleProperties[];
}
