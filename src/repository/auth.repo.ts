import { User, Address } from "../models";
import IRepository from "./irepository";
import Repository from "./repository";

import * as jwt from "jsonwebtoken";

class AuthRepo extends Repository<User> {
  /*constructor(private user: User) {
    super();
  }*/
  find = async (id: string): Promise<User | null> => {
    const user: User | null = await User.findByPk(id);
    return user;
  };
  singOn = async (data: any): Promise<User | null> => {
    const { name, email, phoneNumber, password, type, firstName, lastName, fullName, descriptions } = data;
    const user: User | null = await this.createOne(User, {
      name,
      email,
      fullName,
      firstName,
      lastName,
      phoneNumber,
      password,
      type,
      descriptions,
    });
    if (user) {
      user.accessToken = `Bearer ${this.generateAccessToken(user.email)}`;
    }
    return user;
  };
  singIn = async (query: any): Promise<User | null> => {
    const { email, password } = query;
    const options = {
      where: { email, password },
      include: [Address],
      attributes: { exclude: ["password"] },
    };

    const data: User[] = await this.findAll(User, options);
    const user = data[0];
    if (user) {
      user.accessToken = `Bearer ${this.generateAccessToken(user.email)}`;
    }
    return user;
  };

  first = async (): Promise<User | null> => await this.findFirst(User);
  last = async (): Promise<User | null> => await this.findLast(User);
  disable = async (data: any): Promise<User | null> =>
    await this.disableBy(User, data.id);
  enable = async (data: any): Promise<User | null> =>
    await this.enableBy(User, data.id);

  clear = async () => {
    return true;
  };

  generateAccessToken = (username: string) => {
    return jwt.sign({ username }, process.env.TOKEN_SECRET ?? "TOKEN_SECRET", {
      expiresIn: "24d",
    });
  };
}
export default new AuthRepo();
