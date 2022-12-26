import { Request, Response } from "express";
import parties from "../models/parties";

export const handlePartyController = async (req: Request, res: Response) => {
  res.status(200).send({ success: true, messgae: "handlePartyController.." });
};
