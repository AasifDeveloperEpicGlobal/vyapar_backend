import row from "../models/row";
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

export const getRowService = async (id: string) => {
    const getRow = await row.findById(id);
    return getRow;
}
