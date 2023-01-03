import { Router, Request, Response } from "express";
import { deleteSaleController, handleAllSaleController, handleSaleByIdController, handleSaleController } from "../controllers/sale-controller";
const router = Router();

router.post("/", handleSaleController);
router.get("/", handleAllSaleController);
router.get("/:id", handleSaleByIdController);
router.delete("/:id", deleteSaleController);
export default router;