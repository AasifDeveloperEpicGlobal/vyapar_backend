import row from "../models/row";
import sales from "../models/sale";
import saleCounter from "../models/saleCounters";
import saleSchema, { SaleSchema } from "../models/saleSchema";

{
  /* get all sale service */
}
export const getAllSaleService = async () => {
  const response = await saleSchema.find({});
  return response;
};

{
  /* get sale by id service */
}
export const getSaleByIdService = async (id: string) => {
  const response = await saleSchema.findById(id);
  return response;
};

{
  /* delete sale service */
}
export const deleteSaleService = async (id: string) => {
  const deleteSale = await saleSchema.findByIdAndDelete(id);
  return deleteSale;
};

{
  /* get sale row service */
}
export const getRowService = async (id: string) => {
  const getRow = await row.findById(id);
  return getRow;
};

{
  /* delete sale row service */
}
export const deleteRowService = async (id: string) => {
  const deleteRow = await row.findByIdAndDelete({ id });
  return deleteRow;
};

// generate invoice number - 10 digits
export const generateInvoiceNumber = () => {
  const invoiceNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return invoiceNumber;
};

// generating bill number - 13 digits
export const generateInvoiceNumber2 = () => {
  var d = new Date();
  var t = new Date().getTime();
  var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
  randomnum = d.getFullYear() + (d.getMonth() + 1) + d.getDate() + randomnum;
  randomnum = randomnum + t;
  return randomnum;
};

// total sale qty
export const totalSaleQuantity = async (qty: number) => {
  // total sale qty
  const totalSaleQuantity = await (
    await sales.find({ qty }).lean()
  )
    .map((item: any) => {
      return item.qty;
    })
    .reduce((a, b) => a + b, 0);
  return totalSaleQuantity;
};
