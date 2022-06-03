
import { Router } from "express";
import  routerUser from "./user.router";
const router = Router();

router.use("/users/", routerUser);

export default router;
