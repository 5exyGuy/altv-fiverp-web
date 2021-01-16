import { Prisma } from '@prisma/client';
import Account from './Account';
import Database from '../Database';
import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';
import Session from './Session';

export default class User extends Entity<User> {
    private _id: number;
    private _username: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _emailVerified: Date;
    private _verified: boolean;
    private _image: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _role: string;
    private _accounts: Array<Account>;
    private _characters: Array<Character>;
    private _loginHistories: Array<LoginHistory>;
    private _sessions: Array<Session>;

    public constructor(init?: Partial<User>) {
        super(init);
        this._accounts = new Array();
        this._characters = new Array();
        this._loginHistories = new Array();
        this._sessions = new Array();
    }

    public set id(value: number) {
        this.setUpdateField('id', value);
    }

    public get id(): number {
        return this._id;
    }

    public set username(value: string) {
        this.setUpdateField('username', value);
    }

    public get username(): string {
        return this._username;
    }

    public set name(value: string) {
        this.setUpdateField('name', value);
    }

    public get name(): string {
        return this._name;
    }

    public set email(value: string) {
        this.setUpdateField('email', value);
    }

    public get email(): string {
        return this._email;
    }

    public set password(value: string) {
        this.setUpdateField('password', value);
    }

    public get password(): string {
        return this._password;
    }

    public set updatedAt(value: Date) {
        this.setUpdateField('updatedAt', value);
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public set verified(value: boolean) {
        this.setUpdateField('verified', value);
    }

    public get verified(): boolean {
        return this._verified;
    }

    public set image(value: string) {
        this.setUpdateField('image', value);
    }

    public get image(): string {
        return this._image;
    }

    public set createdAt(value: Date) {
        this.setUpdateField('createdAt', value);
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public set emailVerified(value: Date) {
        this.setUpdateField('emailVerified', value);
    }

    public get emailVerified(): Date {
        return this._emailVerified;
    }

    public set role(value: string) {
        this.setUpdateField('role', value);
    }

    public get role(): string {
        return this._role;
    }

    public async save(): Promise<void> {
        await Database.getConnection().user.create({
            data: {
                username: this.username,
                name: this.name,
                email: this.email,
                password: this.password,
                updatedAt: this.updatedAt,
                verified: this.verified,
                image: this.image,
                createdAt: this.createdAt,
                emailVerified: this.emailVerified,
                role: this.role as 'USER' | 'MOD' | 'ADMIN',
            },
        });
    }

    public async update(): Promise<void> {
        if (this._updateFields.size <= 0) return;

        const fields: { [key: string]: any } = Object.fromEntries(this._updateFields);
        await Database.getConnection().user.update({ data: { ...fields }, where: { id: this.id } });
        this.updateLocalFields(fields);

        // if (this._updateRelationFields.size <= 0) return;

        // const relationFields: { [key: string]: any } = Object.fromEntries(this._updateRelationFields);
        // await Database.getConnection().user.update({ data: {  } });
    }

    public async addAccount(account: Account): Promise<void> {
        await Database.getConnection().account.create({
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
        this._accounts.push(account);
    }

    public async addCharacter(character: Character): Promise<void> {
        await Database.getConnection().character.create({
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
        this._characters.push(character);
    }

    public async addLoginHistory(loginHistory: LoginHistory): Promise<void> {
        await Database.getConnection().loginHistory.create({
            data: {
                fkUser: { connect: { id: this.id } },
                hwidExHash: loginHistory.hwidExHash,
                hwidHash: loginHistory.hwidHash,
                ip: loginHistory.ip,
                socialId: loginHistory.socialId,
                date: loginHistory.date,
            },
        });
        this._loginHistories.push(loginHistory);
    }

    public async addSession(session: Session): Promise<void> {
        await Database.getConnection().session.create({
            data: {
                accessToken: session.accessToken,
                expires: session.expires,
                fkUser: { connect: { id: this.id } },
                sessionToken: session.sessionToken,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
            },
        });
        this._sessions.push(session);
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
        const result = await Database.getConnection().user.delete(args);
        return new User({ ...result });
    }

    public static async findFirst(args?: Prisma.Subset<Prisma.FindUniqueUserArgs, Prisma.FindFirstUserArgs>): Promise<User> {
        const result = await Database.getConnection().user.findFirst(args);
        return new User({ ...result });
    }

    public static async findMany(args?: Prisma.Subset<Prisma.FindManyUserArgs, Prisma.FindManyUserArgs>): Promise<User[]> {
        const result = await Database.getConnection().user.findMany(args);
        const userList: User[] = new Array<User>();
        for (const user of result) {
            const newUser: User = new User({ ...user });
            userList.push(newUser);
        }
        return userList;
    }

    public static async findUnique(args: Prisma.Subset<Prisma.FindUniqueUserArgs, Prisma.FindUniqueUserArgs>): Promise<User> {
        const result = await Database.getConnection().user.findUnique(args);
        return new User({ ...result });
    }
}
