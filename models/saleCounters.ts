// sale counter schema
import { Schema, model } from "mongoose";

const saleCounterSchema = new Schema(
    {
        _id: { type: String, required: true },
        saleInvoiceSeq: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const saleCounter = model("saleCounter", saleCounterSchema);

export default saleCounter;