import { Router } from "express";
import { handlePartystateController } from "../controllers/parties-controller";
const router = Router();

// parties state routes
router.get("/", handlePartystateController);

export default router;
