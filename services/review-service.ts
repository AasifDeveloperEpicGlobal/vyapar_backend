import review from "../models/review";
import reviews from "../models/review";

{/* create review service */ }
export const createReviewService = async (review: any) => {
    try {
        const newReview = await reviews.create(review);
        return newReview;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get review service */ }
export const getReviewService = async () => {
    try {
        const allReviews = await reviews.find({ isApproved: true });
        return allReviews;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* delete review service */ }
export const deleteReviewService = async (id: string) => {
    try {
        const review = await reviews.findByIdAndDelete(id);
        return review;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get review by id service */ }
export const getReviewByIdService = async (id: string) => {
    try {
        const allReviews = await review.find({ productId: id, isApproved: true });
        return allReviews;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get review by admin service */ }
export const getReviewsAdminService = async () => {
    try {
        const allReviews = await reviews.find();
        return allReviews;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get pagination review service */ }
export const getPaginationsService = async (
    filters: any,
    limit: number,
    page: number
) => {
    try {
        const reviewCount = await reviews.countDocuments(filters);
        const pages = Math.ceil(Number(reviewCount) / Number(limit));
        return {
            totalPages: pages,
            nextPage: Number(page) < pages ? Number(page) + 1 : null,
        };
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get pagination by id review service */ }
export const getReviewByPaginationService = async (
    filters: any,
    limit: number,
    page: number,
) => {
    try {
        const reviewCount = await reviews.countDocuments(filters);
        const pages = Math.ceil(Number(reviewCount) / Number(limit));
        return {
            totalPages: pages,
            nextPage: Number(page) < pages ? Number(page) + 1 : null,
        };
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get pagination by admin service */ }
export const getAdminPaginationsService = async (
    filters: any,
    limit: number,
    page: number
) => {
    try {
        const reviewsCount = await reviews.countDocuments(filters);
        const pages = Math.ceil(Number(reviewsCount) / Number(limit));
        return {
            totalPages: pages,
            nextPage: Number(page) < pages ? Number(page) + 1 : null,
        };
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* get pagination admin by product id service */ }
export const getReviewsByProductIdAdminService = async (id: string) => {
    try {
        const allReviews = await reviews.find({ productId: id });
        return allReviews;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* approve review service */ }
export const approveReviewService = async (id: string) => {
    try {
        const review = await reviews.findByIdAndUpdate(
            id, { isApproved: true, }, { new: true },);
        return review;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

{/* deny review service */ }
export const denyReviewService = async (id: string) => {
    try {
        const review = await reviews.findByIdAndUpdate(
            id, { isApproved: false, }, { new: true },);
        return review;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};