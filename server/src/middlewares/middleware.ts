
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
// middleware
export function checkAccessToken(req: Request, res: Response ,next:NextFunction) {
    const accessToken = req.headers?.authorization;
    if (!accessToken) {
      return res.status(401).json({ error: "Access token is required" });
    }
    try {
      const token = accessToken.split(' ')[1];
      const decoded = jwt.verify(token, SECRET_KEY as string);
      res.locals.user = decoded
        next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid access token" });
    }
  }