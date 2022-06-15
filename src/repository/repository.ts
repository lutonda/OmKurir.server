import { User, Address } from "../models";

// import { Model as M} from "../models";

import { Model as M, ModelCtor } from "sequelize-typescript";

export default class Repository<T extends M> {
  protected findOne = async (
    Model: ModelCtor<T>,
    id: string,
    options: any
  ): Promise<T | null> => await Model.findByPk(id, options);

  protected createOne = async (
    Model: ModelCtor<T>,
    data: any
  ): Promise<T | null | any> => { try { return await Model.create(data) } catch (err: any) { return err } };

  protected updateBy = async (
    Model: ModelCtor<T>,
    data: any
  ): Promise<T | null | number> => {
    const { ["id"]: _, ...d } = data;
    const { id } = data;
    const model = await Model.update(d, { where: { id } });
    return 1;
  };

  protected deleteBy = async (
    Model: ModelCtor<T>,
    id: any | string
  ): Promise<boolean> => {
    const model = await Model.destroy({
      where: { id },
      truncate: true,
    });

    return model == 1;
  };

  protected findAll = async (
    Model: ModelCtor<T>,
    options: any
  ): Promise<T[] | any> => {
    const { where, include, attributes } = options;
    const data: T[] = await Model.findAll({ where, include, attributes });
    return data;
  };
  protected findAllBy = async (Model: ModelCtor<T>, options: any) => {
    const { include } = options;
    const data: M[] = await Model.findAll({ include });
    return data;
  };
  protected findFirst = async (Model: ModelCtor<T>): Promise<T | null> =>
    await Model.findOne({ order: [["createdAt", "DESC"]] });

  protected findLast = async (Model: ModelCtor<T>): Promise<T | null> =>
    await Model.findOne({ order: [["createdAt", "ASC"]] });

  protected disableBy = async (
    Model: ModelCtor<T>,
    id: any
  ): Promise<T | null | number | any> =>
    await Model.update({ isActive: false }, { where: { id } });

  protected enableBy = async (
    Model: ModelCtor<T>,
    id: any
  ): Promise<T | null | number | any> =>
    await Model.update({ isActive: false }, { where: { id } });

  protected clearAll = function (Model: ModelCtor<T>) {
    //  - Delete all the records from the collection
  };

  protected classOf = (className: string) => eval(className);
}
