import { model, Schema } from "mongoose";
import row from "../models/row";
import saleCounter from "./saleCounters";

export interface Sale extends Document {
  invoiceDate: Date;
  name: string;
  number: string;
  amount: number;
  itemName: string;
  address: string;
  qty: number;
  unit: string;
  priceUnitTax: string;
  saletax: {
    tax: number;
    taxOnAmount: number;
  };
  row: string[];
  saleId: number;
  paymentMode: string;
  description: string;
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
    itemName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: false,
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
    saleId: {
      type: Number,
      required: false,
    },
    paymentMode: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

saleSchema.pre("save", function (next) {
  saleCounter.findByIdAndUpdate(
    { _id: "saleId" },
    { $inc: { saleInvoiceSeq: 1 } },
    { new: true, upsert: true },
    (err, counter) => {
      if (err) {
        return next(err);
      }
      this.saleId = counter.saleInvoiceSeq;
      next();
    }
  );
});

export default model<Sale>("sale", saleSchema);
