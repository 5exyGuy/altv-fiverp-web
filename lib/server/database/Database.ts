import { Model } from 'objection';
import Knex from 'knex';

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
}
