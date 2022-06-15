import { Table, Column, DataType, HasMany, BeforeUpdate, BeforeCreate } from "sequelize-typescript";
import Address from "./address";
import { Model } from "./index";
import passwordComplexity from "joi-password-complexity";
import bcrypt from 'bcrypt';
@Table({
  timestamps: true,
  tableName: "User",
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fullName?: string;


  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  salt?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => Address)
  address?: Address[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  accessToken?: string;

  passwordCompare = async (password: string) => {
    return await bcrypt.compare(password, this.password);
  }

  @BeforeCreate
  static validatePassword = async (user: User) => {

    const complexityOptions = {
      min: 6, max: 24, lowercase: true,
      uppercase: true
    };
    /*
        if (passwordComplexity(complexityOptions).validate(user.password))
          throw 'password too week';
          */
  }

  @BeforeCreate
  static hashPassword = async (user: User) => {
    const saltRounds = 10;
    try {
      // Generate a salt
      user.salt = await bcrypt.genSalt(saltRounds);

      // Hash password
      user.password = await bcrypt.hash(user.password, user.salt);

      console.log(user.password);

    } catch (error) {
      console.log(error);
    }

  };


}
