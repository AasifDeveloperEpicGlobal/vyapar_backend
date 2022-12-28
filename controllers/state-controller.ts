import {Request, Response} from "express";
import { getAllStateService } from "../services/state-service";

{/* get parties state controller*/ }
export const handlePartystateController =async (req:Request, res:Response) => {
    try {
        const response = await getAllStateService();
        res.status(200).send({success:true, message:"State data", data:response});
    } catch (error:any) {
        res.status(500).send({success:false, message:"Something went wrong!!"});
    }
}