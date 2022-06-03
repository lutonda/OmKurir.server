import {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  dialect,
  pool,
} from "../../config/db.config";
import {Sequelize, Dialect} from "sequelize";


const dia:Dialect=dialect;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: dia,
  // operatorsAliases: false,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

const tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

export default {
    Sequelize,
    sequelize,
    
}
