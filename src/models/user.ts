import { Table, Column, DataType, HasMany } from "sequelize-typescript";
import Address from "./address";
import { Model } from "./index";
@Table({
  timestamps: true,
  tableName: "User",
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fullName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type: number = 0;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => Address)
  address?: Address[];

}
