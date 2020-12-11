export default class Entity {
    public convertToMap(): Map<string, any> {
        const propNames: Array<string> = Object.getOwnPropertyNames(this);
        const properties: Map<string, any> = new Map();
        propNames.forEach((prop) => properties.set(prop, this[prop]));
        return properties;
    }

    public convertToObject(): { [key: string]: any } {
        const propNames: Array<string> = Object.getOwnPropertyNames(this);
        const properties: { [key: string]: any } = {};
        propNames.forEach((prop) => {
            properties[prop] = this[prop];
        });
        return properties;
    }
}
