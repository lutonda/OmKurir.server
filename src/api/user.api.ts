import { Request, Response } from "express";
import { \User } from "../models";
import { UserRepo } from "../repository/index";
class UserApi {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const user: User | null = await UserRepo.create(req.body);
    return res.json(user);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const user = await UserRepo.update(req.body);
    return res.json(user);
  };

  static getOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user: User | null = await UserRepo.find(id);
    return res.json(user);
  };

  static getBy = async (req: Request, res: Response): Promise<Response> => {
    const user: User[] | null = await UserRepo.allBy(req.params);
    return res.json(user);
  };
}

export default UserApi;
