import { Router } from "express";
import { handleItemHsnController } from "../controllers/accessories-items-controller";
const router = Router();

// parties hsn routes
router.get("/", handleItemHsnController);
export default router;
