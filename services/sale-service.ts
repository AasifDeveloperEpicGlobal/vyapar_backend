import { Request, Response } from "express";
import sales from "../models/sale";

export const getAllSaleService = async () => {
    const response = await sales.find({});
    return response;
}

export const getSaleByIdService = async (id: string) => {
    const response = await sales.findById(id);
    return response;
}

export const deleteSaleService = async (id: string) => {
    const deleteSale = await sales.findByIdAndDelete(id);
    return deleteSale;
}