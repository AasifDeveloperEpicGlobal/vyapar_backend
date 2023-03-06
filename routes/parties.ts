import { Router } from "express";
import {
  handleAllPartyController,
  handleDeletePartyController,
  handlePartyByIdController,
  handlePartyController,
  handleUpdatePartyController,
} from "../controllers/parties-controller";
import parties from "../models/parties";
const router = Router();

//parties router
router.post("/create-party", handlePartyController);
router.get("/", handleAllPartyController);
router.get("/:id", handlePartyByIdController);
router.delete("/:id", handleDeletePartyController);
router.put("/:id", handleUpdatePartyController);

// search by name
router.get("/partySearch/:key", async (req, res) => {
  const user = req.user;
  try {
    const data = await parties
      .find({
        $or: [{ name: { $regex: req.params.key, $options: "$i" } }],
        createdBy: user?._id,
      })
      .limit(10);
    res.json(data);
  } catch (error) {
    res.json(404);
  }
});

// search by mobile no
router.get("/partySearchMobile/:key", async (req, res) => {
  try {
    const data = await parties
      .find({
        $or: [{ number: { $regex: req.params.key, $options: "$i" } }],
      })
      .limit(10);
    res.json(data);
  } catch (error) {
    res.json(404);
  }
});

export default router;
