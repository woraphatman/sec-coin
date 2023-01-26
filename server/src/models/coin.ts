import { DataTypes } from "sequelize";
import sequelize from "../db/mysql";
import User from "./user";

const Coin = sequelize.define(
  "coin",
  {
    totalcoin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    coinid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

User.belongsTo(Coin, {
  foreignKey: "id",
  targetKey: "userid"
});

export default Coin;
