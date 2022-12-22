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

//create token
export const create_token = async (id: string, req: Request, res: Response) => {
  try {
    const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY);
    return res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

//login service
export const loginService = async (
  email: string,
  password: string,
  req: Request,
  res: Response
) => {
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
  // const response = {
  //   success: true,
  //   data: payload,
  //   message: "Login successful",
  // };
  // res.status(200).send(response);
  const token = signJWT(payload);
  return token;
};

// register user service
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  mobile: string,
  company: string
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
    company
  });

  await newUser.save();
  return newUser;
};
