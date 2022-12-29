import unit from "../models/unit";

{/* get parties state service */ }
export const getAllUnitService =async () => {
    const response = await unit.find();
    return response;
}