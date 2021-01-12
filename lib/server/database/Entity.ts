export default class Entity<T> {
    public constructor(init?: Partial<T>) {
        Object.assign(this, init);
    }

    protected parse(prismaEntity: { [key: string]: any }): void {
        for (const key in prismaEntity) this[key] = prismaEntity[key];
    }

    protected deleteProperties(): void {
        const propNames: Array<string> = Object.getOwnPropertyNames(this);
        for (const prop of propNames) delete this[prop];
    }

    public convertToMap(): Map<string, any> {
        const propNames: Array<string> = Object.getOwnPropertyNames(this);
        const properties: Map<string, any> = new Map();
        for (const prop of propNames) properties.set(prop, this[prop]);
        return properties;
    }

    public convertToObject(): { [key: string]: any } {
        const propNames: Array<string> = Object.getOwnPropertyNames(this);
        const properties: { [key: string]: any } = {};
        for (const prop of propNames) properties[prop] = this[prop];
        return properties;
    }
}
