import { Router,Request, Response } from "express";
import {
  deleteItemController,
  handleAllItemController,
  handleItemByIdController,
  handleItemController,
  handleItemHsnController,
  handleItemUnitController,
  handleUpdatePartyController,
} from "../controllers/items-controller";
const router = Router();
import { upload } from "../middlewares/upload";

//items routes
router.post("/create-item", upload.single("avatar"), handleItemController);
router.get("/", handleAllItemController);
router.get("/:id", handleItemByIdController);
router.delete("/:id", deleteItemController);
router.put("/:id", handleUpdatePartyController);

// item hsns routes
router.get("/hsn", handleItemHsnController);

// unit routes
router.get("/unit", handleItemUnitController);
export default router;
