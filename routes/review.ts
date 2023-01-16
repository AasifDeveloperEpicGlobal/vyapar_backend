import { Router } from "express";
import { approveReviewController, createReviewController, declineReviewController, deleteReviewController, getReviewByIdController, getReviewController, getReviewsAdminController, getReviewsByProductIdAdminController } from "../controllers/review-controller";
const router = Router();

{/* review routes */ }
router.post("/create", createReviewController);
router.get("/admin", getReviewsAdminController);
router.get("/admin/:id", getReviewsByProductIdAdminController);
router.get("/", getReviewController);
router.delete("/:id", deleteReviewController);
router.get("/:id", getReviewByIdController);

router.put("/approv/:id", approveReviewController);
router.put("/deny/:id", declineReviewController);
export default router;