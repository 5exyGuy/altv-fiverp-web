import Iron from '@hapi/iron';
import clone from 'clone';

export default class Store {
    private _ironStore: { persistent: { [key: string]: any }; flash: { [key: string]: any } };
    private _password: string | Array<{ id: string; password: string }>;
    private _ttl: number;

    private constructor(
        password: string | Array<{ id: string; password: string }>,
        ttl: number,
        ironStore: { persistent: { [key: string]: any }; flash: { [key: string]: any } }
    ) {
        this._password = password;
        this._ttl = ttl;
        this._ironStore = ironStore;
    }

    public set(name: string, value: any): any {
        return (this._ironStore.persistent[name] = clone(value));
    }

    public setFlash(name: string, value: any): any {
        return (this._ironStore.flash[name] = clone(value));
    }

    public unset(name: string): void {
        delete this._ironStore.persistent[name];
        delete this._ironStore.flash[name];
    }

    public get(name: string): any | { [key: string]: any } {
        if (!name) {
            const store = this._ironStore;
            const flash: { [key: string]: any } = store.flash;
            this._ironStore.flash = {};
            return clone({ ...flash, ...store.persistent });
        }

        if (this._ironStore.flash[name]) {
            const value = this._ironStore.flash[name];
            delete this._ironStore.flash[name];
            return value;
        } else return this._ironStore.persistent[name];
    }

    public clear(): void {
        this._ironStore.persistent = {};
        this._ironStore.flash = {};
    }

    public async seal(): Promise<string> {
        const ttl: number = this._ttl;
        const passwordForSeal: { id: string; secret: string } = Array.isArray(this._password)
            ? {
                  id: this._password[0].id,
                  secret: this._password[0].password,
              }
            : {
                  id: '1',
                  secret: this._password,
              };
        return await Iron.seal(this._ironStore, passwordForSeal, { ...Iron.defaults, ttl });
    }

    private static normalizePasswordForUnseal(
        sealed: string,
        password: string | Array<{ id: string; password: string }>
    ): string | { [key: string]: any } {
        if (typeof password === 'string') {
            if (sealed.startsWith(`${Iron.macPrefix}**`)) {
                return password;
            }

            return { 1: password };
        }

        return password.reduce((acc, currentPassword) => {
            return {
                [currentPassword.id]: currentPassword.password,
                ...acc,
            };
        }, {});
    }

    public static async createStore(
        password: string | Array<{ id: string; password: string }>,
        ttl: number = 0,
        sealed?: string
    ): Promise<Store> {
        const ironStore: { persistent: { [key: string]: any }; flash: { [key: string]: any } } = !sealed
            ? await Iron.unseal(sealed, this.normalizePasswordForUnseal(sealed, password), { ...Iron.defaults, ttl })
            : { persistent: {}, flash: {} };
        return new Store(password, ttl, ironStore);
    }
}
