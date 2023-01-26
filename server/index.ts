import express from "express";
import cors from "cors";
import http from "http";
import { connect } from "./src/db/mysql";
import * as dotenv from "dotenv";
import { PORT } from "./src/config/config";
import router from "./src/routes";
import socketIO from "socket.io";
import db from "./src/models/index";
import { socket } from "./src/controllers/socket";
dotenv.config();

const app = express();
const server = http.createServer(app);
//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use(router);

db.sequelize
  .sync()
  .then(() => {
    console.log("Table created successfully");
  })
  .catch((err: any) => {
    console.error("Unable to create table: ", err);
  });

async function start() {
  await connect();
  const server = app.listen(PORT as string, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
  await socket(server);
}
start();
