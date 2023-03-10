import { Router } from "express";
import accessoriesItems from "../models/accessoriesItems";
import { resizeImageAndUpload } from "../services/image-service";
const router = Router();
import upload from "../config/multer";
import {
  deleteItemController,
  handleAllItemController,
  handleItemByIdController,
} from "../controllers/accessories-items-controller";
import { isValidObjectId } from "mongoose";
import path from "path";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import items from "../models/items";

// CREATE ITEM
router.post(
  "/item",
  // upload.single("image"),
  async (req, res) => {
    try {
      let {
        name,
        code,
        saleAmount,
        hsn,
        unit,
        percentage,
        saleTax,
        discOnSaleAmount,
        purchaseAmount,
        purchaseTaxAmount,
        noneTax,
      } = req.body;

      // if (!req.file) {
      //   return res.status(400).send({
      //     success: false,
      //     message: "IMAGE is required",
      //   });
      // }

      if (!code || !name || !saleAmount || !hsn) {
        return res.status(400).send({
          success: false,
          message: "Fields are required. Value must be unique.",
        });
      }

      const itemCode = await accessoriesItems.findOne({ code });
      if (itemCode) {
        return res.status(400).json({
          success: false,
          message: "Item code already exists, Enter a unique code",
        });
      }

      const itemHSN = await accessoriesItems.findOne({ hsn });
      if (itemHSN) {
        return res.status(400).json({
          success: false,
          message: "HSN must be unique code",
        });
      }

      const findDuplicateItem = await accessoriesItems.findOne({
        name,
      });

      if (findDuplicateItem) {
        return res.status(400).send({
          success: false,
          message: "Name already exists & must be unique",
        });
      }

      // const getUrl = await resizeImageAndUpload(req.file, name);

      const accessoriesIcon = new accessoriesItems({
        code: code,
        // image: getUrl,
        name: name,
        saleAmount: saleAmount,
        hsn,
        percentage,
        unit,
        saleTax,
        discOnSaleAmount,
        purchaseAmount,
        purchaseTaxAmount,
        noneTax,
        createdBy: req.user._id,
      });

      accessoriesIcon.save((err, data) => {
        if (err) throw err;
        res.send({
          success: true,
          message: "Item added successful",
          response: data,
        });
      });
    } catch (error: any) {
      res.status(500).send(error?.message);
    }
  }
);

// GET ALL ITEM
router.get("/", handleAllItemController);
router.get("/:id", handleItemByIdController);
router.delete("/:id", deleteItemController);

// UPDATE ITEMS BY ID
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const file = req.file ? req.file : undefined;
  const { name, code, saleAmount, saleTaxAmount, hsn, unit } = req.body;

  if (!id || !isValidObjectId(id)) {
    if (file) {
      await rm(file.path);
    }

    return res.status(400).send({
      success: false,
      message: "valid id is required",
    });
  }

  try {
    const imageUrl = await resizeImageAndUpload(req.file, name);
    await accessoriesItems
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            code: code,
            saleAmount: saleAmount,
            saleTaxAmount: saleTaxAmount,
            image: file ? imageUrl : undefined,
            hsn,
            unit,
          },
        },
        { multi: false, omitUndefined: true, new: false }
      )
      .then((data) => {
        if (file) {
          // Delete old image
          const pathname = path.join(
            __dirname,
            `../uploads/icons/${data?.image.split("/").pop()}`
          );
          if (existsSync(pathname)) {
            rm(pathname);
          }
        }

        res.send(data);
      })
      .catch(async (err) => {
        if (file) {
          await rm(file.path);
        }
        res.status(500).send(err);
      });
  } catch (error) {
    if (file) {
      await rm(file.path);
    }
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const updateItem = await accessoriesItems.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Item Updated Successful.",
      updateItem,
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

// item search by name
router.get("/itemSearch/:key", async (req, res) => {
  const user = req.user;
  try {
    const data = await accessoriesItems
      .find({
        $or: [{ name: { $regex: req.params.key, $options: "$i" } }],
        createdBy: user?._id,
      })
      .limit(10);
    res.json(data);
  } catch (error) {
    res.json(404);
  }
});

export default router;
