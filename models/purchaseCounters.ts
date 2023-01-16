// purchase counter schema
import { Schema, model } from "mongoose";

const purchaseCounterSchema = new Schema(
    {
        _id: { type: String, required: true },
        purchaseBillSeq: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const purchaseCounter = model("purchaseCounter", purchaseCounterSchema);

export default purchaseCounter;