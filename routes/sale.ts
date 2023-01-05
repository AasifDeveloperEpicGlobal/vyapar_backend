import { Router, Request, Response } from "express";
import { deleteSaleController, handleAllSaleController, handleSaleByIdController, handleSaleController, updateSaleController } from "../controllers/sale-controller";
const router = Router();

router.post("/", handleSaleController);
router.get("/", handleAllSaleController);
router.get("/:id", handleSaleByIdController);
router.delete("/:id", deleteSaleController);
router.put("/update/:id", updateSaleController);
export default router;