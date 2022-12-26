import { Router } from "express";
import {
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

export default router;
