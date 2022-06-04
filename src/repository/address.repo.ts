import { Address, User } from "../models";
import IRepository from "./irepository";
import Repository from "./repository";

class AddressRepo extends Repository<Address> implements IRepository<Address> {
  /*constructor(private address: Address) {
    super();
  }*/

  private defaultOptions = async () => ({
    attributes: Object.keys(await Address.describe()),
    include: [User],
  });

  find = async (id: string, options: any = {}): Promise<Address | null> => {
    options = { ...options, ... await this.defaultOptions(), };
    const address: Address | null = await this.findOne(Address, id, options);
    return address;
  };
  create = async (data: any): Promise<Address | null> => {
    const {
      address,
      city,
      province,
      isActive,
      user: { id: userId },
    } = data;
    return await this.createOne(Address, {
      address,
      city,
      province,
      isActive,
      userId,
    });
  };

  update = async (data: any): Promise<Address | null> => {
    const {
      id,
      address,
      city,
      province,
      isActive,
      user: { id: userId },
    } = data;
    await this.updateBy(Address, {
      id,
      address,
      city,
      province,
      isActive,
      userId,
    });
    return await this.find(id);
  };

  delete = async (data: any): Promise<boolean> => {
    return await this.deleteBy(Address, data.id);
  };

  all = async (): Promise<Address[] | null> => {
    const options = { include: {}, attributes: {} };

    const data: Address[] | null = await this.findAll(Address, options);
    return data;
  };
  allBy = async (query: any): Promise<Address[] | null> => {
    const where = query;
    const options = { include: {}, attributes: {}, where };

    const data: Address[] | null = await this.findAll(Address, {});
    return data;
  };

  first = async (): Promise<Address | null> => await this.findFirst(Address);
  last = async (): Promise<Address | null> => await this.findLast(Address);
  disable = async (data: any): Promise<Address | null> =>
    await this.disableBy(Address, data.id);
  enable = async (data: any): Promise<Address | null> =>
    await this.enableBy(Address, data.id);

  clear = async () => {
    return true;
  };
}
export default new AddressRepo();
