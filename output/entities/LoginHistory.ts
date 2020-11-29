import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import User from "./User";

@Index("fk_User_id", ["fkUserId"], { unique: true })
@Entity("LoginHistory")
export default class LoginHistory {
  @Column("datetime", { name: "date" })
  public date!: Date;

  @Column("varchar", { name: "ip", length: 255 })
  public ip!: string;

  @Column("varchar", { name: "socialId", length: 255 })
  public socialId!: string;

  @Column("binary", { name: "hwidExHash", length: 1 })
  public hwidExHash!: Buffer;

  @Column("binary", { name: "hwidHash", length: 1 })
  public hwidHash!: Buffer;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_User_id", unique: true })
  public fkUserId!: number;

  @OneToOne(() => User, (user) => user.loginHistory, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_User_id", referencedColumnName: "id" }])
  public fkUser!: Promise<User>;
}
