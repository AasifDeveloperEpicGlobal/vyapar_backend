import purchase from "../models/purchase";

// generating bill number
export const generateBillNumber = () => {
    var d = new Date();
    var t = new Date().getTime();
    var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
    randomnum = d.getFullYear() + (d.getMonth() + 1) + (d.getDate()) + randomnum;
    randomnum = randomnum + t;
    return randomnum;
};

export const getAllPurchaseService = async () => {
    const response = await purchase.find({});
    return response;
}
