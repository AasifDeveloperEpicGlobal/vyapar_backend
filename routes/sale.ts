import { Router } from "express";
import {
  addSaleRowController,
  deleteSaleController,
  deleteSaleRowController,
  getRowController,
  handleAllSaleController,
  handleSaleByIdController,
  handleSaleController,
  handleSaleSchemaController,
  updateRowController,
  updateSaleController,
} from "../controllers/sale-controller";
const router = Router();

router.post("/", handleSaleController);
router.post("/saleSchema", handleSaleSchemaController);
router.get("/", handleAllSaleController);
router.get("/:id", handleSaleByIdController);
router.delete("/:id", deleteSaleController);
router.put("/update/:id", updateSaleController);

// row routes
router.post("/add-row/:id", addSaleRowController);
router.get("/add-row/:id", getRowController);
router.put("/update-row/:id", updateRowController);
router.delete("/delete-sale-row/:id", deleteSaleRowController);

export default router;
