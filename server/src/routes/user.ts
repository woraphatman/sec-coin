import express from "express";
import {
  deleteUser,
  getUsers,
  getUsersOne,
  updateUsersname,
} from "../controllers/user";

const router = express.Router();
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUsersOne);

userRouter.put("/:id", updateUsersname);

userRouter.delete("/:id", deleteUser);

router.use(userRouter);
export default router;
