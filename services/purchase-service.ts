import purchase from "../models/purchase";
import purchaseRow from "../models/purchaseRow";
import purchaseSchema from "../models/purchaseSchema";

// generating bill number - 13 digits
export const generateBillNumber = () => {
  var d = new Date();
  var t = new Date().getTime();
  var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
  randomnum = d.getFullYear() + (d.getMonth() + 1) + d.getDate() + randomnum;
  randomnum = randomnum + t;
  return randomnum;
};

// generate invoice number - 10 digits
export const generateBillNumber1 = () => {
  const invoiceNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return invoiceNumber;
};

{
  /* get all purchase service */
}
export const getAllPurchaseService = async () => {
  const response = await purchaseSchema.find({});
  return response;
};

{
  /* get purchase by id service */
}
export const getPurchaseByIdService = async (id: string) => {
  const response = await purchaseSchema.findById(id);
  return response;
};

{
  /* delete purchase service */
}
export const deletePurchaseService = async (id: string) => {
  const response = await purchaseSchema.findByIdAndDelete(id);
  return response;
};

{
  /* get purchase row service */
}
export const getRowService = async (id: string) => {
  const getRow = await purchaseRow.findById(id);
  return getRow;
};

{
  /* delete purchase row service */
}
export const deleteRowService = async (id: string) => {
  const deleteRow = await purchaseRow.findByIdAndDelete({ id });
  return deleteRow;
};

// total purchase quantity
export const totalPurchaseQuantity = async (qty: number) => {
  // total qty
  const totalPurchaseQuantity = await (
    await purchase.find({ qty }).lean()
  )
    .map((item: any) => {
      return item.qty;
    })
    .reduce((a, b) => a + b, 0);
  return totalPurchaseQuantity;
};
