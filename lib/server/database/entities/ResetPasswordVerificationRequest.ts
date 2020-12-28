import Entity from '../Entity';

export default class ResetPasswordVerificationRequest extends Entity<ResetPasswordVerificationRequest> {
    public identifier: string;
    public token: string;
    public expires: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public id: number;
}
