import { PrismaClient } from '@prisma/client';

export default class Database {
    private _prismaClient: PrismaClient = new PrismaClient();

    private constructor() {}

    public get PrismaClient(): PrismaClient {
        if (!this._prismaClient) this._prismaClient = new PrismaClient();
        return this._prismaClient;
    }

    private static _instance: Database = new Database();

    public static get instance(): Database {
        if (!this._instance) this._instance = new Database();
        return this._instance;
    }
}
