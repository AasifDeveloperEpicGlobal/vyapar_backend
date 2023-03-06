import { Request, Response } from "express";
import {
  registerAdminService,
  registerUserService,
} from "../services/auth-service";
const bcryptjs = require("bcryptjs");
import users from "../models/users";
import { isValidObjectId } from "mongoose";
const jwt = require("jsonwebtoken");

// register user controller start
export const handleRegisterController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, company, role, isRegistered } =
      req.body;
    const user = await registerUserService(
      name,
      email,
      password,
      mobile,
      company,
      role,
      isRegistered
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

//user login controller start
export const handleLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne(
      { email: email }
      // { email: 1, role: 1, mobile: 1 }
    );
    if (user) {
      const userPassword = await bcryptjs.compare(password, user.password);
      if (userPassword) {
        jwt.sign(
          { user },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" },
          (error: any, token: string) => {
            if (error) {
              res.send({
                result: "Something went wrong, please try after sometime!!",
              });
            }
            res
              .cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              })
              .send({
                success: true,
                user,
                token: token,
                message: "You are logged in Successfully.",
              });
            // res.send({ user, auth: token });
          }
        );
      } else {
        res.status(200).send({ success: false, message: "User not found" });
      }
    } else {
      res.status(200).send({ success: false, message: "Invalid credentials" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
//login controller end

// register admin controller start
export const handleRegisterAdminController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, mobile, company, role } = req.body;
    const admin = await registerAdminService(
      name,
      email,
      password,
      mobile,
      company,
      role
    );
    return res.status(200).json({
      success: true,
      admin,
      message: "Registration successfully..",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
//register admin controller end

// logout start
export const handleLogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Check Admin
// export const isAdmin = async (req: Request, res: Response) => {
//   try {
//     const admin = await users.find({ role: "admin" });
//     if()
//     res.clearCookie("access_token");
//     res.status(200).json({ success: true, message: "Logout successful" });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
//logout end

// delete register account
export const deleteRegisterController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const deleteAccount = await users.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Account deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// count user controller
export const dataCount = async (req: Request, res: Response) => {
  try {
    const count_data = [];
    // const countUser = await users.find().count(); //count all users and admin
    const countUser = await users.find({ role: "user" }).count(); //count only user
    count_data.push({
      countUser: countUser,
    });
    res
      .status(200)
      .send({ success: true, message: "Counting users", data: count_data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
