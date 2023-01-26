import User from "../models/user";
import { Request, Response } from "express";
import Coin from "../models/coin";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll({
      include: [Coin],
    });
    res.status(200).json({ message: users });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
export async function updateUsersname(req: Request, res: Response) {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res.status(401).json({ message: "Not found user" });
    }
    await User.update(
      { username: username },
      { where: { id: id } },
      res.status(200).json({ message: "updated success" })
    );
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}

export async function getUsersOne(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id: id }, include: [Coin] });
    res.status(200).json({ message: user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res.status(401).json({ message: "Not found user" });
    }
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "deleted success" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
