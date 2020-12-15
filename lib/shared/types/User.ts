export type UserPayload = { username: string; role: string };
export const UndefinedUser = undefined;

export type UserHook = { user: UserPayload; loading: boolean; mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any> };

export type UserProfile = {
    email: string;
    registrationDate: Date;
};
