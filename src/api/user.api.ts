import { Request, Response } from "express";
import { User } from "../models";
class UserApi {
  static create = async (req: Request, res: Response) => {
    const user = await User.create({
      name: "Sebastiao Lutonda",
      email: "lutonda@gmail.com",
      phoneNumber: "+244936927698",
      password: "mypassword",
      type: 1,
    });
    res.json(user);
  };
  static update = (req: Request, res: Response) => {
    res.json("update :: OmKurir server is Up");
  };
  static getOne = async (req: Request, res: Response) => {
    const {id}=req.params;
    const user = await User.findByPk(id);
    console.log(user);
    res.json(["getOne :: OmKurir server is Up ~>", user]);
    // res.json("getOne:: OmKurir server is Up~>"+req.params.id);
  };

  static getBy = async (req: Request, res: Response) => {
    const user = await User.findAll();
    res.json(user);
  };
}
export default UserApi;
