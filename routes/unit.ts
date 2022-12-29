import { Router } from "express";
import { handleItemUnitController } from "../controllers/unit-controller";

const router = Router();

// parties state routes
router.get("/unit", handleItemUnitController);

export default router;