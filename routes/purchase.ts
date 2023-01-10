import { Router } from "express";
import { handlePurchaseController } from "../controllers/purchase-controller";
const router = Router();

// purchase router...
router.post("/", handlePurchaseController);

export default router;