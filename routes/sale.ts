import { Router, Request, Response } from "express";
import {
    addSaleRowController,
    deleteSaleController,
    getRowController,
    handleAllSaleController,
    handleSaleByIdController,
    handleSaleController,
    updateSaleController
} from "../controllers/sale-controller";
const router = Router();

router.post("/", handleSaleController);
router.get("/", handleAllSaleController);
router.get("/:id", handleSaleByIdController);
router.delete("/:id", deleteSaleController);
router.put("/update/:id", updateSaleController);

router.post("/add-row/:id", addSaleRowController);
router.get("/add-row/:id", getRowController);
export default router;