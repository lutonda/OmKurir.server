import { Request, Response } from "express";
import { Address, User } from "../models";

class AddressApi {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const { address, city, province } = req.body;
    const newAddress: Address = await Address.create({
      address,
      city,
      province,
    });
    return res.json(newAddress);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const {
      id,
      address,
      city,
      province,
      isActive,
      user: { id: userId },
    } = req.body;
    const newAddress = await Address.update(
      {
        address,
        city,
        province,
        userId,
        isActive
      },
      { where: { id } }
    );
    return res.json(newAddress);
  };

  static getOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const address: Address | null = await Address.findByPk(id);
    return res.json(address);
  };

  static getBy = async (req: Request, res: Response): Promise<Response> => {
    const address: Address[] = await Address.findAll({include:[User]});
    return res.json(address);
  };
}
export default AddressApi;
