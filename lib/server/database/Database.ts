import Knex from 'knex';
import { Model } from 'objection';

// type Repository =
//     | 'account'
//     | 'apartment'
//     | 'apartmentInventory'
//     | 'business'
//     | 'businessInventory'
//     | 'character'
//     | 'characterApartment'
//     | 'characterBusiness'
//     | 'characterHouse'
//     | 'characterInventory'
//     | 'characterSkill'
//     | 'characterVehicle'
//     | 'contact'
//     | 'faction'
//     | 'factionMember'
//     | 'house'
//     | 'houseInventory'
//     | 'inventory'
//     | 'inventoryItem'
//     | 'item'
//     | 'loginHistory'
//     | 'message'
//     | 'registrationRequest'
//     | 'resetPasswordRequest'
//     | 'session'
//     | 'skill'
//     | 'user'
//     | 'vehicleInventory'
//     | 'vehicle'
//     | 'vehicleProperties'
//     | 'verificationRequest';

export default class Database {
    private _connection: Knex;

    public connect(): void {
        if (this._connection) return;
        this._connection = Knex({
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'fiverp',
            },
        });
        Model.knex(this._connection);
    }

    public get isConnected(): boolean {
        return !!this._connection;
    }

    private static _instance: Database;

    public static getInstance(): Database {
        if (process.env.NODE_ENV === 'production') {
            if (!this._instance) this._instance = new Database();
        } else {
            if (!(<any>global)._instance) {
                this._instance = new Database();
                (<any>global)._instance = this._instance;
            } else {
                this._instance = (<any>global)._instance;
            }
        }
        return this._instance;
    }

    // public static getRepository<T>(repository: Repository): T {
    //     return <T>(<any>this.getConnection()[repository]);
    // }
}
