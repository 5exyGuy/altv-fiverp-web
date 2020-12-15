export type Session = {
    set: <T = any>(name: string, value: T) => void;
    get: <T = any>(name: string) => T | undefined;
    unset: (name: string) => void;
    destroy: () => void;
    save: () => Promise<void>;
};
