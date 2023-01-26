import { Sequelize } from "sequelize";
import sequelize from "../db/mysql";
import coin from "./coin";
import user from "./user";

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = user;
db.usercoin = coin;
export default db;
