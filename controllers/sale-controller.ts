import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import sale from "../models/sale";
import { deleteSaleService, getAllSaleService, getSaleByIdService } from "../services/sale-service";

// sale controller
export const handleSaleController = async (req: Request, res: Response) => {
    try {
        const { name, number, amount, itemName, qty, unit } = req.body;
        if (!name || !number || !amount || !itemName || !unit) {
            return res.status(500).send({ success: false, message: "All fields are required" });
        }

        // generating invoice number... 
        let d = new Date();
        let t = new Date().getTime();
        var invoicenumber = Math.floor(Math.random() * (1000 - 500000)) + 1000;
        console.log("Before number :: " + invoicenumber);
        invoicenumber = d.getFullYear() + (d.getMonth() + 1) + (d.getDate()) + invoicenumber;
        invoicenumber = invoicenumber + t;
        console.log("After number :: " + invoicenumber);

        const findDuplicateField = await sale.findOne({
            number
        });

        if (findDuplicateField) {
            return res.status(400).send({
                success: false,
                message: "Number already exists & must be unique",
            });
        }
        let date = new Date();
        const newDate = date.toString();
        const sales = new sale({
            name: name,
            number: number,
            invoiceNumber: invoicenumber,
            invoiceDate: newDate,
            amount: amount,
            itemName: itemName,
            qty: qty,
            unit: unit,
        });

        sales.save((err, data) => {
            if (err) throw err;
            res.send({ success: true, message: "Added Successful", data });
        });
    } catch (error: any) {
        res.status(500).send(error?.message);
    }
}

// get all sale controller
export const handleAllSaleController = async (req: Request, res: Response) => {
    try {
        const Sale = await getAllSaleService();
        res.status(200).send({ success: true, message: Sale });
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
}

// get sale by id controller
export const handleSaleByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            return res
                .status(400)
                .send({ success: false, message: "Invalid Id provided." });
        }

        const response = await getSaleByIdService(req.params.id);
        res.status(200).send({ response });
    } catch (error: any) {
        res.status(400).send({ error: error.message });

    }
}

// delete sale controller
export const deleteSaleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            return res
                .status(400)
                .send({ success: false, message: "ID is required." });
        }

        const deleteSale = await deleteSaleService(id);
        res.status(200).send({ success: true, message: "Sale deleted successful" })
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
}