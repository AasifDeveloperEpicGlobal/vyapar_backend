import { Router } from "express";
import {
  handleAllPartyController,
  handleDeletePartyController,
  handlePartyByIdController,
  handlePartyController,
  handleUpdatePartyController,
} from "../controllers/parties-controller";
const router = Router();

//parties router
router.post("/create-party", handlePartyController);
router.get("/", handleAllPartyController);
router.get("/:id", handlePartyByIdController);
router.delete("/:id", handleDeletePartyController);
router.put("/:id", handleUpdatePartyController);

export default router;
