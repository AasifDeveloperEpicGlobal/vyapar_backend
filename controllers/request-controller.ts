import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import requestDemo from "../models/request";
import { createRequestService, deleteRequestService, getAllRequestDemoService, getRequestService } from "../services/request-service";

{/* create request demo */ }
export const createRequestDemo = async (req: Request, res: Response) => {
    try {
        const { mobile } = req.body;
        if (!mobile) {
            return res.status(500).json({ message: "Number is required" });
        }
        const existsMobile = await requestDemo.findOne({ mobile });
        if (existsMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile already exists, Enter a unique mobile",
            });
        }
        const createRequest = await createRequestService(mobile);
        res.status(200).json({ success: true, message: "Request Successful", createRequest });
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

{/* delete request demo */ }
export const deleteRequestDemo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            res.status(500).json({ success: false, message: "Invalid id provided" });
        }
        const deleteRequest = await deleteRequestService(id);
        res.status(200).json({ success: true, message: "Deleted Request Successful", data: deleteRequest });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

{/* get request demo */ }
export const getRequestDemo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            res.status(500).json({ success: false, message: "Invalid id provided" });
        }

        const getRequest = await getRequestService(id);
        res.status(200).json({ success: true, getRequest });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

{/* get all request demo */ }
export const getAllRequestDemo = async (req: Request, res: Response) => {
    try {
        const getAllRequest = await getAllRequestDemoService();
        res.status(200).json({ success: true, data: getAllRequest });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

{/* update request demo */ }
export const updateRequestDemo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            res.status(500).json({ success: false, message: "Invalid id provided" });
        }
        const updateRequest = await requestDemo.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json({ success: true, message: "Updated Request Successful", data: updateRequest });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}