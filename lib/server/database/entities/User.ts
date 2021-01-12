import { Prisma } from '@prisma/client';
import Account from './Account';
import Database from '../Database';
import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';
import Session from './Session';

export default class User extends Entity<User> {
    private _updateFields: Map<string, any> = new Map();

    private _id: number;
    public username: string;
    public name: string;
    public email: string;
    public password: string;
    public emailVerified: Date;
    public verified: boolean;
    public image: string;
    public createdAt: Date;
    public updatedAt: Date;
    public role: string;
    public accounts?: Account[];
    public characters?: Character[];
    public loginHistories?: LoginHistory[];
    public sessions?: Session[];

    public set id(value: number) {
        if (!this._updateFields) this._updateFields = new Map();
        this._updateFields.set('id', value);
        this._id = value;
    }

    public get id(): number {
        return this._id;
    }

    public async update(): Promise<void> {
        const fields: { [key: string]: any } = Object.fromEntries(this._updateFields);
        await Database.instance.PrismaClient.user.update({ data: { ...fields }, where: { id: this.id } });
    }

    public async addAccount(account: Account): Promise<void> {
        if (!this.accounts) this.accounts = new Array();
        await Database.instance.PrismaClient.account.create({
            data: {
                compoundId: account.compoundId,
                providerAccountId: account.providerAccountId,
                providerId: account.providerId,
                providerType: account.providerType,
                accessToken: account.accessToken,
                accessTokenExpires: account.accessTokenExpires,
                createdAt: account.createdAt,
                refreshToken: account.refreshToken,
                updatedAt: account.updatedAt,
                fkUser: { connect: { id: this.id } },
            },
        });
        this.accounts.push(account);
    }

    public async addCharacter(character: Character): Promise<void> {
        if (!this.characters) this.characters = new Array();
        await Database.instance.PrismaClient.character.create({
            data: {
                armor: character.armor,
                arrestTime: character.arrestTime,
                bank: character.bank,
                cash: character.cash,
                dead: character.dead,
                dimension: character.dimension,
                firstName: character.firstName,
                fkUser: { connect: { id: this.id } },
                health: character.health,
                lastName: character.lastName,
                lastPosition: character.lastPosition,
                phoneNumber: character.phoneNumber,
            },
        });
    }

    public async addLoginHistory(loginHistory: LoginHistory): Promise<void> {
        if (!this.loginHistories) this.loginHistories = new Array();
        await Database.instance.PrismaClient.loginHistory.create({
            data: {
                fkUser: { connect: { id: this.id } },
                hwidExHash: loginHistory.hwidExHash,
                hwidHash: loginHistory.hwidHash,
                ip: loginHistory.ip,
                socialId: loginHistory.socialId,
                date: loginHistory.date,
            },
        });
    }

    public async addSession(session: Session): Promise<void> {
        if (!this.sessions) this.sessions = new Array();
        await Database.instance.PrismaClient.session.create({
            data: {
                accessToken: session.accessToken,
                expires: session.expires,
                fkUser: { connect: { id: this.id } },
                sessionToken: session.sessionToken,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
            },
        });
    }

    public async delete(): Promise<void> {
        await User.delete({
            where: { id: this.id },
            include: {
                accounts: true,
                characters: {
                    include: {
                        characterApartments: true,
                        characterBusinesses: true,
                        characterHouses: true,
                        characterInventory: { include: { fkInventory: { include: { inventoryItems: true } } } },
                        characterSkills: true,
                        characterVehicles: {
                            include: { vechileInventory: { include: { fkInventory: { include: { inventoryItems: true } } } } },
                        },
                        contacts2: true,
                        contacts: true,
                        faction: { include: { factionMembers: true } },
                        factionMember: true,
                        messages2: true,
                        messages: true,
                    },
                },
            },
        });
        this.deleteProperties();
    }

    public static async delete(args: Prisma.Subset<Prisma.UserDeleteArgs, Prisma.UserDeleteArgs>): Promise<User> {
        const result = await Database.instance.PrismaClient.user.delete(args);
        return new User({ ...result });
    }

    public static async findFirst(args?: Prisma.Subset<Prisma.FindUniqueUserArgs, Prisma.FindFirstUserArgs>): Promise<User> {
        const result = await Database.instance.PrismaClient.user.findFirst(args);
        return new User({ ...result });
    }

    public static async findMany(args?: Prisma.Subset<Prisma.FindManyUserArgs, Prisma.FindManyUserArgs>): Promise<User[]> {
        const result = await Database.instance.PrismaClient.user.findMany(args);
        const userList: User[] = new Array<User>();
        for (const user of result) {
            const newUser: User = new User({ ...user });
            userList.push(newUser);
        }
        return userList;
    }

    public static async findUnique(args: Prisma.Subset<Prisma.FindUniqueUserArgs, Prisma.FindUniqueUserArgs>): Promise<User> {
        const result = await Database.instance.PrismaClient.user.findUnique(args);
        return new User({ ...result });
    }
}
