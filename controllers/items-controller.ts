import { Request, Response } from "express";
import hsn from "../models/hsn";
import items from "../models/items";
import unit from "../models/unit";
import { getAllUnitService, getItemHsnService } from "../services/item-service";

// item controller
export const handleItemController = async (req: Request, res: Response) => {
  const {
    name,
    code,
    saleAmount,
    saleTaxAmount,
    discOnSaleAmount,
    purchaseAmount,
    purchaseTaxAmount,
    percentage,
    noneTax,
  } = req.body;
  if (!name || !code || !saleAmount) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  //check code validation
  const itemCode = await items.findOne({ code });
  if (itemCode) {
    return res.status(400).json({
      success: false,
      message: "Item code already exists, Enter a unique code",
    });
  }

  // get units
  const units = await unit.findOne({});

  // get hsnCode
  const Itemhsn = await hsn.findOne({});

  try {
    const item = new items({
      name: req.body.name,
      code: req.body.code,
      unit: units,
      hsn: Itemhsn,

      saleAmount: req.body.saleAmount,
      saleTaxAmount: req.body.saleTaxAmount,
      purchaseAmount: req.body.purchaseAmount,
      purchaseTaxAmount: req.body.purchaseTaxAmount,
      discOnSaleAmount: req.body.discOnSaleAmount,
      percentage: req.body.percentage,
      noneTax: req.body.noneTax,
    });
    // const response = await createItem(req.body);
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

// item unit controller
export const handleItemUnitController = async (req: Request, res: Response) => {
  try {
    const response = await getAllUnitService();
    res
      .status(200)
      .send({ success: true, message: "Unit data", data: response });
  } catch (error: any) {
    res.status(500).send({ success: false, message: "Something went wrong!!" });
  }
};

// item hsn controller
export const handleItemHsnController = async (req: Request, res: Response) => {
  try {
    const Itemhsn = await getItemHsnService();
    res.status(200).send({ success: true, message: "Hsn Data", data: Itemhsn });
  } catch (error: any) {
    res.status(500).send({ success: false, message: "Something went wrong!!" });
  }
};
