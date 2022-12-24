const bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
import users from "../models/users";

//SIGN JWT
export const signJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as any, {
    expiresIn: "24h",
  });
};

//bcrypt password
export const securePassword = async (password: string) => {
  const passwordHash = await bcryptjs.hash(password, 10);
  return passwordHash;
};

// register user service
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  mobile: string,
  company: string,
  role: string
) => {
  const user = await users.findOne({ email });
  if (user) throw new Error("User already exists");

  if (!name || !email || !password || !mobile || !company)
    throw new Error("Please fill all fields");

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new users({
    name,
    email,
    password: hashedPassword,
    mobile,
    company,
    role,
  });
  await newUser.save();
  return newUser;
};

//register admin service
export const registerAdminService = async (
  name: string,
  email: string,
  password: string,
  mobile: string,
  company: string,
  role: string
) => {
  const admin = await users.findOne({ email });
  if (admin) throw new Error("User already exists");

  if (!name || !email || !password || !mobile || !company)
    throw new Error("Please fill all fields");

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newAdmin = new users({
    name,
    email,
    password: hashedPassword,
    mobile,
    company,
    role: "admin",
  });

  await newAdmin.save();
  return newAdmin;
};
