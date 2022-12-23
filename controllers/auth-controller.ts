import { Request, Response } from "express";
import {
  create_token,
  loginService,
  registerUserService,
  signJWT,
} from "../services/auth-service";
const bcryptjs = require("bcryptjs");
import users from "../models/users";

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
    if (!email || !password) throw new Error("Please fill all fields");

    const user = await users.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      company: user.company,
    };
    const token = signJWT(payload);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .send({ success: true, data: payload, message: "Login successful" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
//login controller end
