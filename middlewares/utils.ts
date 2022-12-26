const Jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { decodeJWT, verifyJWT } from "../services/auth-service";

// Verify JWT token...
export const isVerifyToken = async (
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

// export const isAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers["authorization"];
//   if (token) {
//     Jwt.verify(token, process.env.JWT_SECRET_KEY, (error: any) => {
//       if (error) {
//         res
//           .status(401)
//           .send({ success: false, message: "Please provide valid token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({
//       success: false,
//       result: "Full authentication is required to access the resource",
//     });
//   }
// };

export const isAuthenticated = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Full authentication is required to access the resource",
    });
  }
  try {
    const decoded = decodeJWT(token) as any;
    const verified = verifyJWT(token);
    if (decoded && verified) {
      req.user = decoded?.user;
      next();
    } else {
      res.clearCookie("access_token");
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  console.log({ token });
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Full authentication is required to access the resource",
    });
  }
  try {
    const verify = verifyJWT(token);
    if (!verify) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = decodeJWT(token) as any;
    if (decoded?.user?.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
