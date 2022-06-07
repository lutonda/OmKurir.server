import { Router } from "express";
import AuthApi from "../api/auth.api";
import Middleware from "../hooks/middleware.hook";
const routerAuth = Router();

routerAuth.post("/sing_in", AuthApi.singIn);
routerAuth.post("/sing_on", AuthApi.singOn);
routerAuth.post("/sing_on_complete", Middleware.validateToken, AuthApi.completeSingOn);
routerAuth.post("/sing_out", AuthApi.SingOut);
routerAuth.post("/sing_off", AuthApi.singOff);

export default routerAuth;
