import { Model } from 'objection';

export default abstract class Entity<T extends Model> {
    private readonly _updateFields: Map<string, any>;
    private readonly _updateRelationFields: Map<string, any>;

    private _entityModel: T;

    protected constructor() {
        this._updateFields = new Map();
        this._updateRelationFields = new Map();
    }

    protected setUpdateField(fieldName: string, value: any): void {
        this._updateFields.set(fieldName, value);
    }

    protected removeUpdateField(fieldName: string): void {
        this._updateFields.delete(fieldName);
    }

    protected setUpdateRelationField(fieldName: string, value: any): void {
        this._updateRelationFields.set(fieldName, value);
    }

    protected removeUpdateRelationField(fieldName: string): void {
        this._updateRelationFields.delete(fieldName);
    }

    protected updateLocalFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
    }

    protected updateLocalRelationFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateRelationFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
    }
}
