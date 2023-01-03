import { Router } from "express";
import {
  dataCount,
  deleteRegisterController,
  handleLoginController,
  handleLogoutController,
  handleRegisterAdminController,
  handleRegisterController,
} from "../controllers/auth-controller";

const router = Router();

//register user router
router.post("/register-user",handleRegisterController);
router.post("/login", handleLoginController);
router.post("/register-admin", handleRegisterAdminController);
router.post("/logout", handleLogoutController);

//user count
router.get("/user-count", dataCount);

//delete register account
router.delete("/:id", deleteRegisterController);

export default router;
