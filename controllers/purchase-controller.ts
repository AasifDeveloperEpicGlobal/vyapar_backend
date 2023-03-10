import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import purchase from "../models/purchase";
import purchaseRow from "../models/purchaseRow";
import purchaseSchema from "../models/purchaseSchema";
import {
  deletePurchaseService,
  generateBillNumber,
  getAllPurchaseService,
  getPurchaseByIdService,
  getRowService,
  totalPurchaseQuantity,
} from "../services/purchase-service";

// purchase controller..
export const handlePurchaseController = async (req: Request, res: Response) => {
  try {
    const {
      partyName,
      number,
      addDescription,
      itemName,
      qty,
      unit,
      priceUnitTax,
      purchaseTax,
    } = req.body;
    if (!partyName || !number || !itemName || !unit) {
      return res
        .status(500)
        .send({ success: false, message: "All fields are required" });
    }

    // tax on amount
    const taxOnAmount =
      (purchaseTax?.taxOnAmount * purchaseTax?.tax) / 100 + 100;

    // generating bill number...
    //const billNumber = generateBillNumber();
    const findDuplicateField = await purchase.findOne({
      number,
    });

    if (findDuplicateField) {
      return res.status(400).send({
        success: false,
        message: "Number already exists & must be unique",
      });
    }
    let date = new Date();
    const newDate = date.toString();
    const purchases = new purchase({
      partyName,
      number,
      addDescription,
      invoiceDate: newDate,
      itemName,
      qty,
      unit,
      priceUnitTax,
      purchaseTax,
      amount: taxOnAmount,
    });
    purchases.save(async (err, data) => {
      if (err) throw err;
      // const totalValue = await totalQty(qty);  total qty
      res.send({ success: true, message: "Purchase Added Successful", data });
    });
  } catch (error: any) {
    res.status(500).send(error?.message);
  }
};

// get all purchase controller..
export const getAllPurchaseController = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const Purchase = await getAllPurchaseService({ _id });
    res.status(200).send({ success: true, message: Purchase });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// get purchase controller by id..
export const getPurchaseByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }

    const response = await getPurchaseByIdService(req.params.id);
    res.status(200).send({ success: true, message: response });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// delete purchase controller..
export const deletePurchaseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const response = await deletePurchaseService(id);
    res.json({
      message: "Purchase Deleted Succesfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// update purchase controller
export const updatePurchaseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      partyName,
      number,
      addDescription,
      itemName,
      qty,
      unit,
      priceUnitTax,
      paymentType,
      purchaseTax,
    } = req.body;

    // updating tax on amount
    const taxOnAmount =
      (purchaseTax?.taxOnAmount * purchaseTax?.tax) / 100 + 100;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Valid id is required",
      });
    }
    // updating
    await purchase
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            partyName,
            number,
            addDescription,
            itemName,
            qty,
            unit,
            priceUnitTax,
            paymentType,
            amount: taxOnAmount,
            purchaseTax,
          },
        }
      )
      .then((data) => {
        res.send(data);
      })
      .catch(async (err) => {
        res.status(500).send({ err });
      });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// add purchase row controller
export const addPurchaseRowController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { itemName, purchaseTax, qty, unit, priceUnitTax } = req.body;

    // saletax.taxableAmount = ((saletax?.taxableAmount * saletax?.tax) / 100) + 100;
    // console.log(saletax.taxableAmount);
    const taxOnAmount =
      (purchaseTax?.taxOnAmount * purchaseTax?.tax) / 100 + 100;

    if (!itemName) {
      return res.status(400).json({ message: "Item name cannot be empty." });
    }

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID provided." });
    }

    const purchaseFind = await purchase
      .findOne({ _id: id })
      .populate("row")
      .lean();
    if (!purchaseFind) {
      return res.status(400).json({ message: "Invalid ID provided." });
    }

    const addrow = new purchaseRow({
      amount: taxOnAmount,
      itemName: itemName,
      qty: qty,
      unit: unit,
      priceUnitTax,
      purchaseTax,
    });

    addrow.save(req.body, async (err: any, data: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      await purchase.findByIdAndUpdate(id, {
        $push: {
          row: data._id,
        },
      });
      res.status(200).json({
        message: "Purchase Row Added Successfully.",
        data,
      });
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

// get purchase row conrtoller
export const getPurchaseRowController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID provided." });
    }

    const getRow = await getRowService(req.params.id);
    res.status(200).send({ success: true, data: getRow });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// update purchase row controller
export const updatePurchaseRowController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { itemName, qty, unit, purchaseTax, priceUnitTax } = req.body;

    // update tax on amount..
    const taxOnAmount =
      (purchaseTax?.taxOnAmount * purchaseTax?.tax) / 100 + 100;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Valid id is required",
      });
    }
    // updating row
    await purchaseRow
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            itemName,
            qty,
            unit,
            purchaseTax,
            priceUnitTax,
            amount: taxOnAmount,
          },
        }
      )
      .then((data) => {
        res.send(data);
      })
      .catch(async (err) => {
        res.status(500).send(err);
      });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// delete purchase row controller
export const deletePurchaseRowController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const deletedBed = await purchaseRow.findByIdAndDelete(id);
    res.json({
      message: "Purchase Row Deleted Succesfully",
      data: deletedBed,
    });
  } catch (error: any) {
    res.status(500).send(error);
  }
};

export const handlePurchaseSchemaController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      mobile,
      address,
      invoiceDate,
      gstNumber,
      state,

      paymentMode,
      description,
      purchaseRow,
      totalAmount,
    } = req.body;
    if (!name || !mobile) {
      return res
        .status(500)
        .send({ success: false, message: "All fields are required" });
    }

    const findDuplicateField = await purchaseSchema.findOne({
      mobile,
    });

    if (findDuplicateField) {
      return res.status(400).send({
        success: false,
        message: "Number already exists & must be unique",
      });
    }

    let date = new Date();
    const newDate = date.toString();
    const purchaseSaved = new purchaseSchema({
      name,
      mobile,
      invoiceDate,
      address,
      gstNumber,
      state,

      paymentMode,
      description,
      purchaseRow,
      billing: purchaseRow,
      createdBy: req.user._id,
      totalAmount,
    });

    purchaseSaved.save((err, data) => {
      if (err) throw err;
      res.send({ success: true, message: "Purchase Added Successful", data });
    });
  } catch (error: any) {
    res.status(500).send(error?.message);
  }
};
