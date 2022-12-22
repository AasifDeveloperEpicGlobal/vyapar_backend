import { Router } from "express";
import { handleLoginController, handleRegisterController } from "../controllers/auth-controller";
const router = Router();


//register user router
router.post("/register-user", handleRegisterController);
router.post("/login", handleLoginController)


export default router;
