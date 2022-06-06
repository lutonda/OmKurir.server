import { Sequelize } from "sequelize-typescript";

import Model from './model'
import Address from "./address";
import User from "./user";

import dotenv from "dotenv";

dotenv.config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env
const connection = new Sequelize({
  dialect: "mariadb",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  models: [Address, User],
});
export { connection, Address, User, Model };
