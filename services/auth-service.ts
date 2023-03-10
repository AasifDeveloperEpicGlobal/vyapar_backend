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

//VERIFY JWT
export const verifyJWT = async (token: string) => {
  console.log("vefiryyy", jwt.verify(token, "heksdhshd"));
  return jwt.verify(token, "6656fgfdfdgf");
};

//DECODE JWT
export const decodeJWT = async (token: string) => {
  console.log("decode Token", jwt.decode(token));
  return jwt.decode(token);
};

// register user service
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  mobile: string,
  company: string,
  role: string,
  isRegistered: boolean
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
    isRegistered: true,
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

export const getUserService = async () => {
  const response = await users.find();
  return response;
};
