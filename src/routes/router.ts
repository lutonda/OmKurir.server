
import { Router } from "express";
import routerAddress from "./address.router";
import  routerUser from "./user.router";
const router = Router();

router.use("/users/", routerUser);
router.use("/address/", routerAddress);

export default router;
