import { Request, Response } from "express";
import { User } from "../models";
import { UserRepo } from "../repository/index";
class UserApi {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const user: User | null = await UserRepo.create(req.body);
    console.log('4+++++++++++++++++++++++++++++++++++')
    return res.json(user);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const user = await UserRepo.update(req.body);
    console.log('3+++++++++++++++++++++++++++++++++++')
    return res.json(user);
  };

  static getOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user: User | null = await UserRepo.find(id);
    console.log('2+++++++++++++++++++++++++++++++++++')
    return res.json(user);
  };

  static getBy = async (req: Request, res: Response): Promise<Response> => {
    
    //const user: User[] | null = await UserRepo.allBy(req.query);
    const users: User[] | null = await UserRepo.all();
    return res.json(users);
  };
}

export default UserApi;
