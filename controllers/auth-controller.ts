import { Request, Response } from "express";
import users from "../models/users";
import {
  create_token,
  loginService,
  registerUserService,
  securePassword,
} from "../services/auth-service";
const bcryptjs = require("bcryptjs");

// register user controller start
export const handleRegisterController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, company } = req.body;
    const user = await registerUserService(
      name,
      email,
      password,
      mobile,
      company
    );
    return res.status(200).json({
      success: true,
      user,
      message: "Registration successfully..",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// register user controller end

//login controller start
export const handleLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password, req, res);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
//login controller end
