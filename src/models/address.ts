import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user";
import { Model } from "./index";

@Table({
  timestamps: true,
  tableName: "Address",
})
export default class Address extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  province!: string;

  @ForeignKey(() => User)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;
}
