import { PrismaClient } from '@prisma/client';

type Repository =
    | 'account'
    | 'apartment'
    | 'apartmentInventory'
    | 'business'
    | 'businessInventory'
    | 'character'
    | 'characterApartment'
    | 'characterBusiness'
    | 'characterHouse'
    | 'characterInventory'
    | 'characterSkill'
    | 'characterVehicle'
    | 'contact'
    | 'faction'
    | 'factionMember'
    | 'house'
    | 'houseInventory'
    | 'inventory'
    | 'inventoryItem'
    | 'item'
    | 'loginHistory'
    | 'message'
    | 'registrationVerificationRequest'
    | 'resetPasswordVerificationRequest'
    | 'session'
    | 'skill'
    | 'user'
    | 'vehicleInventory'
    | 'vehicle'
    | 'vehicleProperties'
    | 'verificationRequest';

export default class Database {
    private _prismaClient: PrismaClient = new PrismaClient();

    private constructor() {}

    public get prismaClient(): PrismaClient {
        if (!this._prismaClient) this._prismaClient = new PrismaClient();
        return this._prismaClient;
    }

    private static _instance: Database = new Database();

    public static getRepository<T>(repository: Repository): T {
        return <T>(<any>this.getConnection()[repository]);
    }

    public static getConnection(): PrismaClient {
        if (!this._instance) this._instance = new Database();
        return this._instance.prismaClient;
    }
}
