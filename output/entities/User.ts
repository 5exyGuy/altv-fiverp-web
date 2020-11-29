import { Column, Entity, OneToOne } from "typeorm";
import Character from "./Character";
import LoginHistory from "./LoginHistory";

@Entity("User")
export default class User {
  @Column("varchar", { name: "username", length: 255 })
  public username!: string;

  @Column("varchar", { name: "email", length: 255 })
  public email!: string;

  @Column("varchar", { name: "password", length: 255 })
  public password!: string;

  @Column("datetime", { name: "registrationDate" })
  public registrationDate!: Date;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToOne(() => Character, (character) => character.fkUser, { lazy: true })
  public character!: Promise<Character>;

  @OneToOne(() => LoginHistory, (loginHistory) => loginHistory.fkUser, {
    lazy: true,
  })
  public loginHistory!: Promise<LoginHistory>;
}
