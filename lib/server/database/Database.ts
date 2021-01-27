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
    private static _connection: Knex;

    private constructor() {}

    public static connect(): void {
        if (this._connection) return;

        if (process.env.NODE_ENV === 'production') {
            this._connection = Knex({
                client: 'mysql',
                connection: {
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    database: 'fiverp',
                },
            });
        } else {
            if (!(<any>global).knex)
                (<any>global).knex = Knex({
                    client: 'mysql',
                    connection: {
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: 'fiverp',
                    },
                });
            this._connection = (<any>global).knex;
        }

        Model.knex(this._connection);
    }

    public static get isConnected(): boolean {
        if (process.env.NODE_ENV === 'production') return !!this._connection;
        return false;
    }

    // public static getRepository<T>(repository: Repository): T {
    //     return <T>(<any>this.getConnection()[repository]);
    // }
}
