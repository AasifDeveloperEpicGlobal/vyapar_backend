import { Router, Request, Response } from "express";
import {
  handleLoginController,
  handleRegisterController,
} from "../controllers/auth-controller";
import { verifyToken } from "../middlewares/utils";

const router = Router();

//register user router
router.post("/register-user", handleRegisterController);
router.post("/login", handleLoginController);

router.get("/text", verifyToken, function (req: Request, res: Response) {
  res.status(200).send({ success: true, message: "Authenticated" });
});

export default router;
