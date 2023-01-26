import Coin from "../models/coin";
import { Request, Response } from "express";
import { ioSocket } from "./socket";
export async function createCoin(req: Request, res: Response) {
  const { totalcoin, userid } = req.body;
  try {
    const payload = await Coin.create({ userid: userid, totalcoin: totalcoin });
    res.status(201).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}

export async function updateCoin(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    await Coin.update({ totalcoin: amount }, { where: { coinid: id } });
    ioSocket.emit(`coin-${id}`, amount);
    res.status(200).json({ message: " Coin has been updated" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
