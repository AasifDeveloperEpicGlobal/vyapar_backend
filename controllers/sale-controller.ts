import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import row from "../models/row";
import sale from "../models/sale";
import { deleteSaleService, generateInvoiceNumber, getAllSaleService, getRowService, getSaleByIdService } from "../services/sale-service";

// sale controller
export const handleSaleController = async (req: Request, res: Response) => {
    try {
        const { name, number, itemName, qty, unit, priceUnitTax, saletax } = req.body;
        if (!name || !number || !itemName || !unit) {
            return res.status(500).send({ success: false, message: "All fields are required" });
        }

        // saletax.taxableAmount = ((saletax?.taxableAmount * saletax?.tax) / 100) + 100;
        const taxOnAmount = ((saletax?.taxOnAmount * saletax?.tax) / 100) + 100;

        // generating invoice number... 
        const invoiceNumber = generateInvoiceNumber();
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
            name, number,
            invoiceNumber: invoiceNumber,
            invoiceDate: newDate,
            amount: taxOnAmount,
            itemName, qty, unit, priceUnitTax, saletax,
        });

        sales.save((err, data) => {
            if (err) throw err;
            res.send({ success: true, message: "Sale Added Successful", data });
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

// update sale controller
export const updateSaleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, number, itemName, qty, unit, saletax, priceUnitTax } = req.body;

        // saletax.taxableAmount = ((saletax?.taxableAmount * saletax?.tax) / 100) + 100;
        const taxOnAmount = ((saletax?.taxOnAmount * saletax?.tax) / 100) + 100;

        if (!id || !isValidObjectId(id)) {
            return res.status(400).send({
                success: false,
                message: "Valid id is required",
            });
        }
        // updating 
        await sale
            .findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        name,
                        number,
                        itemName,
                        qty,
                        unit,
                        amount: taxOnAmount,
                        saletax,
                        priceUnitTax,
                    },
                },
            )
            .then((data) => {
                res.send(data);
            })
            .catch(async (err) => {
                res.status(500).send(err);
            });
    } catch (error: any) {
        res.status(500).send(error);
    }
}

// add sale row controller
export const addSaleRowController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { itemName, saletax, qty, unit, priceUnitTax } = req.body;

        // saletax.taxableAmount = ((saletax?.taxableAmount * saletax?.tax) / 100) + 100;
        // console.log(saletax.taxableAmount);
        const taxOnAmount = ((saletax?.taxOnAmount * saletax?.tax) / 100) + 100;

        if (!itemName) {
            return res.status(400).json({ message: "Item name cannot be empty." });
        }

        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid ID provided." });
        }

        const saleFind = await sale.findOne({ _id: id }).populate("row").lean();
        if (!saleFind) {
            return res.status(400).json({ message: "Invalid ID provided." });
        }

        const addrow = new row({
            amount: taxOnAmount,
            itemName: itemName,
            qty: qty,
            unit: unit,
            priceUnitTax,
            saletax,
        });

        addrow.save(req.body, async (err: any, data: any) => {
            if (err) {
                return res.status(500).send(err);
            }
            await sale.findByIdAndUpdate(id, {
                $push: {
                    row: data._id,
                },
            });
            res.status(200).json({
                message: "Row Added Successfully",
                data,
            });
        });
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
}

// get sale row conrtoller 
export const getRowController = async (req: Request, res: Response) => {
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
}