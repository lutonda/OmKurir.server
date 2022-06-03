import {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  pool,
  dialect,
} from "../../config/db.config";
import { Sequelize } from "sequelize";
import UserModel from "./user.model";
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  //operatorsAliases: false,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
// const tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
const User: any = UserModel(sequelize, Sequelize);

sequelize
  .sync({
    alter: {
      drop: false,
    },
  })
  .then(() => {
    console.log("Drop and re-sync db.");
  });

export { Sequelize, sequelize, User };
