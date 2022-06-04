import { Router } from "express";
import AuthApi from "../api/auth.api";
const routerAuth = Router();

routerAuth.post("/sing_in", AuthApi.singIn);
routerAuth.post("/sing_on", AuthApi.singOn);
routerAuth.post("/sing_out", AuthApi.SingOut);
routerAuth.post("/sing_off", AuthApi.singOff);

export default routerAuth;
