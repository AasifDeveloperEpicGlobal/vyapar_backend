import { model, Model, Schema } from "mongoose";

export interface Sale extends Document {
    invoiceDate: Date,
    name: string;
    number: string;
    invoiceNumber: number;
    amount: number;
    itemName: string;
    qty: number;
    unit: string;
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
            required: true,
        },
        itemName: {
            type: String,
            require: true
        },
        invoiceDate: {
            type: Date,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

export default model<Sale>("sale", saleSchema);