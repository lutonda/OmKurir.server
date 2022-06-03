import { Router } from "express";
import UserApi from "../api/user.api";
const routerUser = Router();

routerUser.post("/", UserApi.create);
routerUser.put("/:id", UserApi.update);
routerUser.get("/:id", UserApi.getOne);
routerUser.get("/", UserApi.getBy);
routerUser.delete("/:id", UserApi.getBy);

export default routerUser;
