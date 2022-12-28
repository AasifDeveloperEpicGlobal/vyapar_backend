import { Router } from "express";
import { handlePartystateController } from "../controllers/state-controller";
const router = Router();

// parties state routes
router.get("/party-state", handlePartystateController);

export default router;
