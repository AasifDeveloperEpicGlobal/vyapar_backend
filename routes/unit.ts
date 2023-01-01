import { Router } from "express";
import { handleItemUnitController } from "../controllers/accessories-items-controller";
const router = Router();

// parties unit routes
router.get("/", handleItemUnitController);
export default router;
