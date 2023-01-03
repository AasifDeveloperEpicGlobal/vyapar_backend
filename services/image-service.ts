import path from "path";
import * as fs from "fs";
import sharp from "sharp";

export const resizeImageAndUpload = async (
    file: Express.Multer.File | undefined,
    filename: string
  ) => {
    try {
      if (!file) throw Error("File not found");
  
      //PATH CONFIG
      const time = new Date().getTime();
      const fileName = `${filename}-${time}.webp`;
      const folderPath = path.join(__dirname, "../", "uploads", "items");
      const uploadPath = path.join(__dirname, "../", "uploads", "items", fileName);
  
      //CREATE FOLDER IF NOT EXISTS
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
  
      //IMAGE COMPRESSION AND RESIZING WITHOUT CHANGING ASPECT RATIO
      await sharp(file.buffer)
        .resize(1920, 1080, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .webp({ quality: 70 })
        .toFile(uploadPath);
  
      //RETURNING IMAGE URL
      return `${process.env.BASE_URL}/api/items-image/${fileName}`;
    } catch (error: any) {
      throw Error(error?.message);
    }
  };
  
  // resizeIconAndUpload
export const resizeIconAndUpload = async (
  file: Express.Multer.File | undefined,
  filename: string
) => {
  if (!file) throw Error("File not found");

  //PATH CONFIG
  const time = new Date().getTime();
  const fileName = `${filename}-${time}.webp`;
  const folderPath = path.join(__dirname, "../", "uploads", "icons");
  const uploadPath = path.join(__dirname, "../", "uploads", "icons", fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  try {
    await sharp(file.buffer)
      .resize(200, 116, {
        fit: "cover",
      })
      .webp({ quality: 70 })
      .toFile(uploadPath);

    return `${process.env.BASE_URL}/api/icons-image/${fileName}`;
  } catch (error: any) {
    throw Error(error?.message);
  }
};
