import { Router } from "express";
import {
    addPurchaseRowController,
    deletePurchaseController,
    deletePurchaseRowController,
    getAllPurchaseController,
    getPurchaseByIdController,
    getPurchaseRowController,
    handlePurchaseController,
    updatePurchaseController,
    updatePurchaseRowController
} from "../controllers/purchase-controller";
const router = Router();

// purchase router...
router.post("/", handlePurchaseController);
router.get("/", getAllPurchaseController);
router.get("/:id", getPurchaseByIdController);
router.delete("/:id", deletePurchaseController);
router.put("/update/:id", updatePurchaseController);

// purchase row routes
router.post("/add-row/:id", addPurchaseRowController);
router.get("/add-row/:id", getPurchaseRowController);
router.put("/update-row/:id", updatePurchaseRowController);
router.delete("/delete-purchase-row/:id", deletePurchaseRowController);
export default router;