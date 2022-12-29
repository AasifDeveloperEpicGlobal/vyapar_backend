import { Router } from "express";
import {
  handleItemController,
  handleItemHsnController,
  handleItemUnitController,
} from "../controllers/items-controller";
const router = Router();
import { upload } from "../middlewares/upload";

//items routes
router.post("/create-item", upload.single("avatar"), handleItemController);

// item hsns routes
router.get("/hsn", handleItemHsnController);

// unit routes
router.get("/unit", handleItemUnitController);
export default router;
