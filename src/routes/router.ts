
import { Router } from "express";
import Middleware from "../hooks/middleware.hook";
import routerAddress from "./address.router";
import routerAuth from "./auth.router";
import  routerUser from "./user.router";
const router = Router();

router.use("/auth", routerAuth);
router.use("/users",Middleware.validateToken, routerUser);
router.use("/address",Middleware.validateToken, routerAddress);

export default router;
