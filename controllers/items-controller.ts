import { Request, Response } from "express";
import items from "../models/items";

// item controller
export const handleItemController = async (req: Request, res: Response) => {
  const { name, code } = req.body;
  if (!name || !code) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  //check code validation
  const itemCode = await items.findOne({code});
  if(itemCode){
    return res
      .status(400)
      .json({ success:false, message: "Item code already exists, Enter a unique code" });
  }

  try {
    const item = new items({
      name: req.body.name,
      code: req.body.code,
      unit:req.body.unit,
    });
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Image is required",
      });
    } else {
      item.avatar = req.file.path;
    }
    item
      .save()
      .then((response) => {
        res.json({ success: true, message: "Item added successful" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};
