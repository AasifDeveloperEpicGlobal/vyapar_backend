import { model, Schema } from "mongoose";

export interface Purchase extends Document {
    invoiceDate: Date;
    partyName: string;
    billNumber: number;
    number: string;
    paymentType: string;
    addDescription: string;
    total: number;
    roundOff: number;
    // Outside purchase table

    // Inside purchase table
    itemName: string;
    qty: number;
    unit: string;
    priceUnitTax: string;
    amount: number;
    purchaseTax: {
        tax: number,
        taxOnAmount: number;
    }
}

const purchaseSchema = new Schema<Purchase>(
    {
        partyName: {
            type: String,
            required: true,
        },
        billNumber: {
            type: Number,
            required: false,
        },
        number: {
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            required: true,
            default: "CASH",
        },
        addDescription: {
            type: String,
            required: false,
        },
        total: {
            type: Number,
            required: false,
            default: 0,
        },
        roundOff: {
            type: Number,
            required: false,
            default: 0,
        },
        invoiceDate: {
            type: Date,
            default: Date.now,
        },

        itemName: {
            type: String,
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
        purchaseTax: {
            tax: {
                type: Number,
                required: false,
            },
            taxOnAmount: {
                type: Number,
                required: false,
            },
        },
        amount: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<Purchase>("purchase", purchaseSchema);