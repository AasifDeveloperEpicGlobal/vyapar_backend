import hsn from "../models/hsn";
import items from "../models/items";
import unit from "../models/unit";

interface yourItemPayload {
    name: string;
    code: string;
    unit: number[];
    hsn: number[];
    avatar: string;
    saleAmount: number;
    saleTaxAmount: number;
    purchaseAmount: number;
    purchaseTaxAmount: number;
    discOnSaleAmount: number;
    percentage: number;
    noneTax: number
}

{/* get item unit service */ }
export const getAllUnitService = async () => {
    const response = await unit.find();
    return response;
}

{/* get item hsn service */ }
export const getItemHsnService = async () => {
    const Itemhsn = await hsn.find({});
    return Itemhsn;
}

{/* get all item service */ }
export const getAllItemService = async () => {
    const response = await items.find({});
    return response;
}

{/* get item by id service */ }
export const getItemByIdService = async (id: string) => {
    const response = await items.findById(id)
    return response;
}
{/* delete item by id service */ }
export const deleteItemService = async (id: string) => {
    const deleteItem = await items.findByIdAndDelete(id);
    return deleteItem;
}
{/* update item by id service */ }
export const updateItemService = async (id: string, payload: yourItemPayload) => {
    const updatedItem = await items.findByIdAndUpdate(id, payload, { new: true });
    return updatedItem;
}