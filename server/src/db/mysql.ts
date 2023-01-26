const { Sequelize } = require("sequelize");
import { URI } from "../config/config";
const sequelize = new Sequelize(URI);
// connection URI
export async function connect() {
  //Testing the connection
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
