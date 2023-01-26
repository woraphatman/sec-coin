import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { EXPIRED_TIME, SECRET_KEY } from "../config/config";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
  const confirmPassword = req.body;
    if (confirmPassword !== password) {
      res.status(401).json({message:"Confirm password does not match password"});
    }
    await User.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const body = await User.findOne( {where: {username: username }});
  if (!body) {
    res.status(401).json({ message: "Not found user" });
  }
  const ispasswd = bcrypt.compare(password, body.password as string);
  if (!ispasswd) {
    res.status(401).json({ message: "Invalid password" });
  }
    const token = await jwt.sign(
      {
        sub: { id: body.id, user: body.username },
      },
      SECRET_KEY as string,
      { expiresIn: EXPIRED_TIME}
    );
    res.status(200).json(token);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
export function users(req: Request, res: Response) {
  const user = res.locals.user;
  res.send(user);
}
