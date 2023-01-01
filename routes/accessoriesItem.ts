import { Router, Request, Response } from "express";
import accessoriesItems from "../models/accessoriesItems";
import { resizeIconAndUpload } from "../services/image-service";
const router = Router();
import upload from "../config/multer";
import hsn from "../models/hsn";
import unit from "../models/unit";
import { deleteItemController, handleAllItemController, handleItemByIdController, handleItemUnitController } from "../controllers/accessories-items-controller";

// CREATE ITEM
router.post("/item", upload.single("image"), async (req, res) => {
    try {
        console.log("running");
        let { name, code, saleAmount, saleTaxAmount } = req.body;

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "IMAGE is required",
            });
        }

        if (!code || !name || !saleAmount || !saleTaxAmount) {
            return res.status(400).send({
                success: false,
                message: "fields are required",
            });
        }

        const HSN = await hsn.findOne({});
        const UNIT = await unit.findOne({});
        const findDuplicateItem = await accessoriesItems.findOne({
            name,
            code
        });

        if (findDuplicateItem) {
            return res.status(400).send({
                success: false,
                message: "Name & Code already exists & must be unique",
            });
        }

        const getUrl = await resizeIconAndUpload(req.file, name);

        const accessoriesIcon = new accessoriesItems({
            code: code,
            image: getUrl,
            name: name,
            saleAmount: saleAmount,
            hsn: HSN,
            unit: UNIT,
            saleTaxAmount: saleTaxAmount,
        });

        accessoriesIcon.save((err, data) => {
            if (err) throw err;
            res.send(data);
        });
    } catch (error: any) {
        res.status(500).send(error?.message);
    }
});

// GET ALL ITEM
router.get("/", handleAllItemController);
router.get("/:id", handleItemByIdController);
router.delete("/:id", deleteItemController);

export default router;
