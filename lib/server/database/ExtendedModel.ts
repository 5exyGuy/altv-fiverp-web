import { Model } from 'objection';

export default class ExtendedModel<T> extends Model {
    protected _updateFields?: Map<string, any>;
    protected _updateRelationFields?: Map<string, any>;

    public constructor(init?: Partial<T>) {
        super();
        // TODO: Needs to be fixed, because it's causing sql syntax errors
        // this._updateFields = new Map();
        // this._updateRelationFields = new Map();
        Object.assign(this, init);
    }

    protected setUpdateField(fieldName: string, value: any): void {
        this._updateFields.set(fieldName, value);
    }

    protected setUpdateRelationField(fieldName: string, value: any): void {
        this._updateRelationFields.set(fieldName, value);
    }

    protected updateLocalFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
    }

    protected updateLocalRelationFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateRelationFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
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

    public convertUpdateFieldsToObject(): { [key: string]: any } {
        return Object.fromEntries(this._updateFields);
    }
}
