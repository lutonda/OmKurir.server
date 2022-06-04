import {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  pool,
  dialect,
} from "../../config/db.config";

import { Sequelize } from "sequelize-typescript";

import Model from './model'
import Address from "./address";
import User from "./user";

const connection = new Sequelize({
  dialect: "mariadb",
  host: HOST,
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  logging: true,
  models: [Address, User],
});
export { connection, Address, User, Model };
