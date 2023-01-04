import { model, Schema, Document } from "mongoose";

interface Accessories extends Document {
    code: string;
    image: string;
    name: string;
    unit: string;
    hsn: number;

    saleAmount: number;
    saleTaxAmount: number;
    purchaseAmount: number;
    purchaseTaxAmount: number;
    discOnSaleAmount: number;
    percentage: number;
    noneTax: number;
}

const accessoriesIconSchema = new Schema<Accessories>(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        unit: [
            {
                type: Schema.Types.ObjectId,
                ref: "units",
            },
        ],
        hsn: // otherwise same rakhna hai hsn ko unit ke jaise..
            [
                {
                    // type: Schema.Types.ObjectId,
                    ref: "hsns",
                    type: Number,
                    required: true,
                },
            ],
        saleAmount: {
            type: Number,
            required: true,
        },
        saleTaxAmount: {
            type: Number,
            required: true,
        },
        purchaseAmount: {
            type: Number,
            required: false,
        },
        purchaseTaxAmount: {
            type: Number,
            required: false,
        },
        discOnSaleAmount: {
            type: Number,
            required: false,
        },
        percentage: {
            type: Number,
            required: false,
        },
        noneTax: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<Accessories>("accessoriesItems", accessoriesIconSchema);
