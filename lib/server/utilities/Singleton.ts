export default class Singleton {
    protected constructor() {}

    private static _instance: Singleton;

    public static getInstance(): Singleton {
        if (process.env.NODE_ENV === 'production') {
            if (!this._instance) this._instance = new Singleton();
        } else {
            if (!(<any>global)._instance) {
                this._instance = new Singleton();
                (<any>global)._instance = this._instance;
            } else {
                this._instance = (<any>global)._instance;
            }
        }
        return this._instance;
    }
}
