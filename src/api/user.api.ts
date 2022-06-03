import { Request, Response } from "express";
class UserApi {
  static create = (req: Request, res: Response) => {
    res.json("create:: OmKurir server is Up");
  };
  static update = (req: Request, res: Response) => {
    res.json("update:: OmKurir server is Up");
  };
  static getOne = (req: Request, res: Response) => {
    res.json("getOne:: OmKurir server is Up~>"+req.params.id);
  };

  static getBy = (req: Request, res: Response) => {
    res.json("getBy:: OmKurir server is Up");
  };
}
export default UserApi;
