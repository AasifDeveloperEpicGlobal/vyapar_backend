import { model, Schema } from "mongoose";
import row from "../models/row";

export interface Sale extends Document {
    invoiceDate: Date,
    name: string;
    number: string;
    invoiceNumber: number;
    amount: number;
    itemName: string;
    qty: number;
    unit: string;
    priceUnitTax: string;
    saletax: {
        tax: number;
        taxOnAmount: number;
    }
    row: string[];

}

const saleSchema = new Schema<Sale>(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
            unique: true,
        },
        invoiceNumber: {
            type: Number,
            required: false,
        },
        itemName: {
            type: String,
            require: true
        },
        invoiceDate: {
            type: Date,
            default: Date.now,
        },
        amount: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            default: 0,
        },
        priceUnitTax: {
            type: String,
            required: false,
            default: "Without Tax",
        },
        saletax: {
            tax: {
                type: Number,
                required: false,
            },
            taxOnAmount: {
                type: Number,
                required: false,
            },
        },
        row: [
            {
                type: Schema.Types.ObjectId,
                ref: row,
            }
        ]
    },
    {
        timestamps: true,
    }
);

export default model<Sale>("sale", saleSchema);