import express from "express";
import { register, login, users } from "../controllers/auth";
import { checkAccessToken } from "../middlewares/middleware";

const router = express.Router();
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/user",checkAccessToken, users);

router.use(authRouter);
export default router;
