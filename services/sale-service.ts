import { Request, Response } from "express";
import sale from "../models/sale";

export const getAllSaleService = async () => {
    const response = await sale.find({});
    return response;
}

export const getSaleByIdService = async (id: string) => {
    const response = await sale.findById(id);
    return response;
}

export const deleteSaleService =async (id:string) => {
    const deleteSale = await sale.findByIdAndDelete(id);
    return deleteSale;    
}