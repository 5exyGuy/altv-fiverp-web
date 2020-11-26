import { Connection, createConnection } from 'typeorm';

export default class Database {
    private _connection: Connection;

    public constructor() {
        this._connection = createConnection({
            host: 'localhost',
            user: 'root',
            database: 'fiverp',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    private static _instance: Database = new Database();

    public static get instance(): Database {
        if (!this._instance) this._instance = new Database();
        return this._instance;
    }
}
