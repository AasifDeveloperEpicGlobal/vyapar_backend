const path = require("path");
const multer = require("multer");
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, next: any) {
    next(null, "uploads/");
  },
  filename: function (req: Request, file: any, next: any) {
    let ext = path.extname(file.originalname);
    next(null, Date.now() + ext);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req: Request, file: any, next: any) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      next(null, true);
    } else {
      console.log("Only png or jpg file supported");
      next(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
