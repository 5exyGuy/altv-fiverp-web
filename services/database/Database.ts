import mysql from 'mysql2';
import { Connection } from 'typeorm';

export default class Database {
    private _mysqlPool: mysql.Pool;

    public constructor() {
        this._mysqlPool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'fiverp',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    public async getConnection() {
        return await this._mysqlPool.promise().getConnection();
    }

    private static _instance: Database = new Database();

    public static get instance(): Database {
        if (!this._instance) this._instance = new Database();
        return this._instance;
    }
}
