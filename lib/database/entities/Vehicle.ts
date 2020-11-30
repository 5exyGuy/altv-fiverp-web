import CharacterVehicle from './CharacterVehicle';

export default class Vehicle {
    public name: string;
    public hash: string;
    public price: number;
    public manufacturer: string;
    public seats: number;
    public class: string;
    public type: string;
    public maxBraking: number;
    public maxBrakingMods: number;
    public maxSpeed: number;
    public maxTraction: number;
    public acceleration: number;
    public agility: number;
    public maxKnots: number;
    public moveResistance: number;
    public id: number;
    public CharacterVehicle: CharacterVehicle[];
}
