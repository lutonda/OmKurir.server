import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models";
import { UserRepo } from "../repository";

export default class Middleware {
  static validateToken = (req: Request, res: Response, next: any) => {
    const authorization = req.headers["authorization"];

    console.log(authorization);
    const token = authorization && authorization.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        console.log(decoded);
        const { username: email } = decoded;
        const user: User | null = await UserRepo.findBy({ email });
        if (user) req.user = user;
        next();
      }
    );
  };
}
