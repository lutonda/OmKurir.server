import { Request, Response } from "express";
import { Address } from "../models";
import { AddressRepo } from "../repository/index";
class AddressApi {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const newAddress: Address | null = await AddressRepo.create(req.body);
    return res.json(newAddress);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const newAddress = await AddressRepo.update(req.body);
    return res.json(newAddress);
  };

  static getOne = async (req: Request, res: Response): Promise<Response> => {
    const address: Address | null = await AddressRepo.find(req.params.id);
    return res.json(address);
  };

  static getBy = async (req: Request, res: Response): Promise<Response> => {
    const address: Address[] | null = await AddressRepo.allBy(req.params);
    return res.json(address);
  };
}
export default AddressApi;
