import {Request, Response} from "express";
import { getAllUnitService } from "../services/unit-service";

{/* get item unit controller*/ }
export const handleItemUnitController =async (req:Request, res:Response) => {
    try {
        const response = await getAllUnitService();
        res.status(200).send({success:true, message:"Unit data", data:response});
    } catch (error:any) {
        res.status(500).send({success:false, message:"Something went wrong!!"});
    }
}