const Jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

// Verify JWT token...
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (error: any) => {
      if (error) {
        res
          .status(401)
          .send({ success: false, message: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      result: "Full authentication is required to access the resource",
    });
  }
};
