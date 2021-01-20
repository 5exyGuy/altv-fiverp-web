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
    | 'registrationRequest'
    | 'resetPasswordRequest'
    | 'session'
    | 'skill'
    | 'user'
    | 'vehicleInventory'
    | 'vehicle'
    | 'vehicleProperties'
    | 'verificationRequest';

export default class Database {
    private _connection: PrismaClient;

    private constructor() {}

    public get prismaClient(): PrismaClient {
        if (!this._connection)
            if (process.env.NODE_ENV === 'production') this._connection = new PrismaClient();
            else {
                if (!(<any>global).prisma) (<any>global).prisma = new PrismaClient();
                this._connection = (<any>global).prisma;
            }

        return this._connection;
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
