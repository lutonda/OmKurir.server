import { Request, Response } from "express";
import { Address, User } from "../models";
class UserApi {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, phoneNumber, password, type, fullName, descriptions } =
      req.body;
    const user: User = await User.create({
      name,
      email,
      fullName,
      phoneNumber,
      password,
      type,
      descriptions,
    });
    return res.json(user);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const {
      id,
      name,
      email,
      phoneNumber,
      password,
      type,
      fullName,
      descriptions,
      isActive
    } = req.body;
    const user = await User.update(
      {
        name,
        email,
        phoneNumber,
        password,
        type,
        fullName,
        descriptions,
        isActive
      },
      { where: { id } }
    );
    return res.json(user);
  };

  static getOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user: User | null = await User.findByPk(id);
    return res.json(user);
  };

  static getBy = async (req: Request, res: Response): Promise<Response> => {
    const user: User[] = await User.findAll({include:[Address]});
    return res.json(user);
  };
}

export default UserApi;
