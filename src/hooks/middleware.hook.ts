import { Request as Req, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models";
import { UserRepo } from "../repository";

// Declaring custom request interface
// We export this interface so that we can use it in other places in our project
export interface Request extends Req {
  user?: any;
}

export default class Middleware {
  static validateToken = (req: Request, res: Response, next: any) => {
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
      token,
      process.env.TOKEN_SECRET ?? 'TOKEN_SECRET',
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        const { username: email } = decoded;
        const user: User | null = await UserRepo.findBy({ email });
        if (user){
          req.user = user;
          return next();
        }
        return res.sendStatus(403);
      }
    );
  };
}
