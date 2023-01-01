import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import hsn from "../models/hsn";
import items from "../models/items";
import unit from "../models/unit";
import { deleteItemService, getAllItemService, getAllUnitService, getItemByIdService, getItemHsnService } from "../services/item-service";

// item controller start 
export const handleItemController = async (req: Request, res: Response) => {
  const { name, code, saleAmount, saleTaxAmount } = req.body;
  if (!name || !code || !saleAmount || !saleTaxAmount) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  // saleAmount - 500
  // saleTaxAmount -5% GST
  // newAmont should be 525
  var newAmount = await (saleAmount * saleTaxAmount) / 100;

  //check code validation
  const itemCode = await items.findOne({ code });
  if (itemCode) {
    return res.status(400).json({
      success: false,
      message: "Item code already exists, Enter a unique code",
    });
  }

  const units = await unit.findOne({});
  const Itemhsn = await hsn.findOne({});

  try {
    const item = new items({
      name: req.body.name,
      code: req.body.code,
      unit: units,
      hsn: Itemhsn,
      saleAmount: newAmount,
      saleTaxAmount: req.body.saleTaxAmount,
      purchaseAmount: req.body.purchaseAmount,
      purchaseTaxAmount: req.body.purchaseTaxAmount,
      discOnSaleAmount: req.body.discOnSaleAmount,
      percentage: req.body.percentage,
      noneTax: req.body.noneTax,
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
// item controller end


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


{/* get all items controller */ }
export const handleAllItemController = async (req: Request, res: Response) => {
  try {
    const response = await getAllItemService();
    res.status(200).send({ success: true, response });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

{/* get items by id controller */ }
export const handleItemByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }

    const response = await getItemByIdService(req.params.id);
    res.status(200).send({ response });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

{/* delete items by id controller */ }
export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const deleteItem = await deleteItemService(id);
    res.status(200).send({ success: true, message: "Item deleted Successful" })
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
{/* update items by id controller */ }
export const handleUpdatePartyController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const updateParty = await items.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          code: req.body.code,
          saleAmount: req.body.saleAmount,
          saleTaxAmount:req.body.saleTaxAmount,
          avatar: req.file?.filename
        }
      },
      { new: true }
    );

    res.status(200).send({ updateParty });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};