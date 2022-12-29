import hsn from "../models/hsn";
import unit from "../models/unit";

{/* get item unit service */ }
export const getAllUnitService =async () => {
    const response = await unit.find();
    return response;
}

{/* get item hsn service */ }
export const getItemHsnService =async () => {
    const Itemhsn = await hsn.find({});
    return Itemhsn;
}