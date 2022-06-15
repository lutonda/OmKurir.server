import { AddressRepo } from ".";
import { Address, Model, User } from "../models";
import authRepo from "./auth.repo";
import IRepository from "./irepository";
import Repository from "./repository";

class UserRepo extends Repository<User> implements IRepository<User> {
  constructor() {
    super();
  }
  find = async (id: string): Promise<User | null> => {
    const options = { attributes: { exclude: ["password"] }, include: [Address] };
    const user: User | null = await this.findOne(User, id, options);
    return user;
  };
  findOneBy = async (where: any): Promise<User | null> => {
    const users: User[] | null = await this.allBy({ where });
    return users ? users[0] : null;
  };
  findBy = async (where: any): Promise<User | null> => {
    const users: User[] | null = await this.allBy({ where });
    return users ? users[0] : null;
  };
  create = async (data: any): Promise<User | null> => {
    const { name, email, phoneNumber, password, type,
      firstName,
      lastName, fullName, descriptions } =
      data;
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

    return user;
  };

  update = async (data: any): Promise<User | null> => {
    const {
      id,
      name,
      email,
      phoneNumber,
      password,
      type,
      fullName,
      firstName,
      lastName,
      descriptions,
      isActive,
      address = []
    } = data;
    await this.updateBy(User, {
      id,
      name,
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      type,
      fullName,
      descriptions,
      isActive,
    });
    address.forEach((add: any) => {
      add.id ? AddressRepo.update({ ...add, ...{ user: { id } } }) : AddressRepo.create({ ...add, ...{ user: { id } } });
    })

    let user = await this.find(id);
    if (user)
      user.accessToken = `Bearer ${authRepo.generateAccessToken(user.email)}`;
    return user;
  };

  delete = async (data: any): Promise<boolean> => {
    return await this.deleteBy(User, data.id);
  };

  all = async (): Promise<User[] | null> => {
    const options = { include: {}, attributes: {} };

    //  options.attributes = { exclude: ["password"] };
    const data: User[] | null = await this.findAll(User, options);
    return data;
  };
  allBy = async ({ where, attributes }: any): Promise<User[] | null> => {

    let { exclude = '', include = '' } = attributes ?? {}
    console.log({ where, attributes })
    try {
      exclude = exclude.split(',').push("password");
    } catch (e: any) {
      exclude=[]

    }
    try {
      include = include.split(',');
    } catch (e: any) {
      include=[]
    }

   // include = include.split(',');
    attributes = { include, exclude };

    // const data: User[] | null = await this.findAll(User, options);

    console.log('********************************');
    console.log('********************************');
    console.log({ where, attributes })
    console.log('********************************');
    console.log('********************************');
    console.log('********************************');

    const users: User[] | null = await this.allBy({ where, attributes });
    return users;
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
}
export default new UserRepo();
