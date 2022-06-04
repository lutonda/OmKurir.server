import { Router } from "express";
import AddressApi from "../api/address.api";
const routerAddress = Router();

routerAddress.post("/", AddressApi.create);
routerAddress.put("/", AddressApi.update);
routerAddress.get("/:id", AddressApi.getOne);
routerAddress.get("/", AddressApi.getBy);
routerAddress.delete("/", AddressApi.getBy);

export default routerAddress;
