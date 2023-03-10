import { Router } from "express";
import {
  dataCount,
  deleteRegisterController,
  getUserController,
  handleLoginController,
  handleLogoutController,
  handleRegisterAdminController,
  handleRegisterController,
} from "../controllers/auth-controller";

const router = Router();

// --------------------------------- Routes ---------------------------------------
router.post("/register-user", handleRegisterController);
router.post("/login", handleLoginController);
router.post("/register-admin", handleRegisterAdminController);
router.post("/logout", handleLogoutController);

//user count
router.get("/user-count", dataCount);

//delete register account
router.delete("/:id", deleteRegisterController);

//get uses
router.get("/get_user", getUserController);

export default router;
