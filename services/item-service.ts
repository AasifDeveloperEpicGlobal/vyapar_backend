import accessoriesItems from "../models/accessoriesItems";
import hsn from "../models/hsn";
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
  noneTax: number;
}

{
  /* get item unit service */
}
export const getAllUnitService = async () => {
  const response = await unit.find();
  return response;
};

{
  /* get item hsn service */
}
export const getItemHsnService = async () => {
  const Itemhsn = await hsn.find({});
  return Itemhsn;
};

{
  /* get all item service */
}
export const getAllItemService = async (userId: any) => {
  const response = await accessoriesItems.find({ createdBy: userId });
  return response;
};

{
  /* get item by id service */
}
export const getItemByIdService = async (id: string) => {
  const response = await accessoriesItems.findById(id);
  return response;
};
{
  /* delete item by id service */
}
export const deleteItemService = async (id: string) => {
  const deleteItem = await accessoriesItems.findByIdAndDelete(id);
  return deleteItem;
};
{
  /* update item by id service */
}
export const updateItemService = async (
  id: string,
  payload: yourItemPayload
) => {
  const updatedItem = await accessoriesItems.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedItem;
};
