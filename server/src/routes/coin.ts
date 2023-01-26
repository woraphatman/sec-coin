import express from "express";
import { createCoin, updateCoin } from "../controllers/coin";

const router = express.Router();
const coinRouter = express.Router();

coinRouter.post("/", createCoin);
coinRouter.put("/:id", updateCoin);

router.use(coinRouter);
export default router;
