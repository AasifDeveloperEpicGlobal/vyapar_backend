import { Router } from "express";
import { handlePartyController } from "../controllers/parties-controller";
import { isAdmin, isAuthenticated } from "../middlewares/utils";
const router = Router();

//parties router
router.post("/create-party", isAdmin, handlePartyController);

export default router;
