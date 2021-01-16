import Entity from '../Entity';

export default class VerificationRequest extends Entity<VerificationRequest> {
    private _identifier: string;
    private _token: string;
    private _expires: Date;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _id: number;
}
