import { Request, Response } from "express";
import purchase from "../models/purchase";
import { generateBillNumber, getAllPurchaseService } from "../services/purchase-service";

// purchase controller..
export const handlePurchaseController = async (req: Request, res: Response) => {
    try {
        const { partyName, number, addDescription, itemName, qty, unit, priceUnitTax, purchaseTax } = req.body;
        if (!partyName || !number || !itemName || !unit) {
            return res.status(500).send({ success: false, message: "All fields are required" });
        }
        // tax on amount
        const taxOnAmount = ((purchaseTax?.taxOnAmount * purchaseTax?.tax) / 100) + 100;

        // generating bill number... 
        const billNumber = generateBillNumber();
        const findDuplicateField = await purchase.findOne({
            number,
        })

        if (findDuplicateField) {
            return res.status(400).send({
                success: false,
                message: "Number already exists & must be unique",
            });
        }
        let date = new Date();
        const newDate = date.toString();
        const purchases = new purchase({
            partyName, number, addDescription,
            billNumber: billNumber,
            invoiceDate: newDate, itemName,
            qty, unit, priceUnitTax, purchaseTax,
            amount: taxOnAmount,
        });

        purchases.save((err, data) => {
            if (err) throw err;
            res.send({ success: true, message: "Purchase Added Successful", data });
        });

    } catch (error: any) {
        res.status(500).send(error?.message);
    }
}

