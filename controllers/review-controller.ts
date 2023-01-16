import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { approveReviewService, createReviewService, deleteReviewService, denyReviewService, getPaginationsService, getReviewByIdService, getReviewByPaginationService, getReviewsAdminService, getReviewsByProductIdAdminService, getReviewService } from "../services/review-service";

{/* create review controller */ }
export const createReviewController = async (req: Request, res: Response) => {
    try {
        const { name, email, review, images, ratings = 1, productId } = req.body;
        if (!name || !email || !review || !productId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const createReview = await createReviewService({
            name, email, review, images, ratings, productId,
        });
        res.status(200).json(createReview);
    } catch (error: any) {
        res.status(400).json({ message: error.message, });
    }
};

{/* get review controller */ }
export const getReviewController = async (req: Request, res: Response) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const reviews = await getReviewService(); // get all review with isApproved : true
        const pagination = await getPaginationsService(
            { isApproved: true },
            Number(limit),
            Number(page)
        );
        res.status(200).json({ reviews, ...pagination });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

{/* delete review controller */ }
export const deleteReviewController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id provided" });
        }
        const review = await deleteReviewService(id);
        res.status(200).json({ success: true, message: "Delete Review Successful", data: review });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

{/* get review by id controller */ }
export const getReviewByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { limit = 10, page = 1 } = req.query;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id provided" });
        }
        const review = await getReviewByIdService(id);
        const pagination = await getReviewByPaginationService(
            { _id: id, isApproved: true },
            Number(limit),
            Number(page),
        );
        res.status(200).json({ review, ...pagination });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

{/* get review admin controller */ }
export const getReviewsAdminController = async (
    req: Request,
    res: Response
) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const reviews = await getReviewsAdminService();
        const pagination = await getPaginationsService(
            {},
            Number(limit),
            Number(page)
        );
        res.status(200).json({ reviews, ...pagination });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};

{/* get review admin product by id controller */ }
export const getReviewsByProductIdAdminController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id;
        const { limit = 10, page = 1 } = req.query;
        const reviews = await getReviewsByProductIdAdminService(id);
        const pagination = await getPaginationsService(
            { _id: id },
            Number(limit),
            Number(page)
        );
        res.status(200).json({ reviews, ...pagination });
    } catch (error: any) {
        res.status(400).json({ message: error.message, });
    }
};

{/* approve review controller */ }
export const approveReviewController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid id provided" });
        }
        const review = await approveReviewService(id);
        res.status(200).json(review);
    } catch (error: any) {
        res.status(400).json({ message: error.message, });
    }
};

{/* deny review controller */ }
export const declineReviewController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid id provided" });
        }
        const review = await denyReviewService(id);
        res.status(200).json(review);
    } catch (error: any) {
        res.status(400).json({ message: error.message, });
    }
};