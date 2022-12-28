import { Router } from "express";
import { handleItemController } from "../controllers/items-controller";
const router = Router();
import { upload } from "../middlewares/upload";

//items routes
router.post("/create-item", upload.single('avatar'), handleItemController);

export default router;
