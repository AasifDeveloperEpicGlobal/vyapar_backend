import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import sale from "../models/sale";
import { deleteSaleService, getAllSaleService, getSaleByIdService } from "../services/sale-service";

// sale controller
export const handleSaleController = async (req: Request, res: Response) => {
    try {
        const { name, number, invoiceNumber, amount, itemName, qty } = req.body;
        if (!name || !number || !invoiceNumber || !amount || !itemName) {
            return res.status(500).send({ success: false, message: "All fields are required" });
        }

        const findDuplicateField = await sale.findOne({
            number,
            invoiceNumber
        });

        if (findDuplicateField) {
            return res.status(400).send({
                success: false,
                message: "Number or Invoce number already exists & must be unique",
            });
        }
        const newDate = new Date();

        const sales = new sale({
            name: name,
            number: number,
            invoiceNumber: invoiceNumber,
            invoiceDate: newDate,
            amount: amount,
            itemName: itemName,
            qty: qty,
        });

        sales.save((err, data) => {
            if (err) throw err;
            res.send(data);
        });
    } catch (error: any) {
        res.status(500).send(error?.message);
    }
}

// get all sale controller
export const handleAllSaleController = async (req: Request, res: Response) => {
    try {
        const allSale = await getAllSaleService();
        res.status(200).send({ success: true, message: allSale });
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