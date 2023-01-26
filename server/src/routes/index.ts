import express from "express";
import userRouter from "./user"
import coinRouter from "./coin"
import authRouter from "./auth"
import { checkAccessToken } from "../middlewares/middleware";

const router = express.Router();

router.use("/users" , [checkAccessToken],userRouter);
router.use("/auth", authRouter);
router.use("/coin", [checkAccessToken], coinRouter);

export default router;