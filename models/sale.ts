import { model, Model, Schema } from "mongoose";

export interface Sale extends Document {
    invoiceDate: Date,
    name: string;
    number: string;
    invoiceNumber: number;
    amount: number;
    itemName: string;
    qty: number;
}

const saleSchema = new Schema<Sale>(
    {
        qty: {
            type: Number,
            required: true,
            default: 0,
        },
        itemName: {
            type: String,
            require: true
        },
        invoiceDate: {
            type: Date,
            required: true,
            // default: Date.now,
        },
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
        amount: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default model<Sale>("sale", saleSchema);