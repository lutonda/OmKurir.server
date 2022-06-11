import { Request, Response } from "express";
import { User } from "../models";
import authRepo from "../repository/auth.repo";
import { UserRepo } from "../repository/index";
class AuthApi {
  static singOn = async (req: Request, res: Response): Promise<Response> => {
    const user: User | null = await authRepo.singOn(req.body);
    return res.json(user);
  };
  static completeSingOn = async (req: Request, res: Response): Promise<Response> => {
    const user: User | null = await UserRepo.update({...req.body,...{isActive:true}});
    return res.json(user);
  };

  static SingOut = async (req: Request, res: Response): Promise<Response> => {
    const user = await UserRepo.update(req.body);
    return res.json(user);
  };

  static singIn = async (req: Request, res: Response): Promise<Response> => {
    const user: User | null = await authRepo.singIn(req.body);
    if (user) return res.json(user);
    
    else return res.status(401).send({message:"auth_does_not_match"});
  };

  static singOff = async (req: Request, res: Response): Promise<Response> => {
    const user: User[] | null = await UserRepo.allBy(req.params);
    return res.json(user);
  };
}

export default AuthApi;
