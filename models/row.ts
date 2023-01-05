import { model, Schema } from "mongoose";

export interface AddRow extends Document {
    _id: string;
    itemName: string;
    amount: number;
    qty: number;
    unit: string;
    priceUnitTax: string;
    saletax: {
        tax: number;
        taxOnAmount: number;
    }
}

const AddRowSchema = new Schema<AddRow>(
    {
        itemName: {
            type: String,
            require: true
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
            default: "Without Tax"
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
        }
    },
    {
        timestamps: true,
    }
);

export default model<AddRow>("row", AddRowSchema);