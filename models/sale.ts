import { model, Schema } from "mongoose";
import row from "../models/row";
import saleCounter from "./saleCounters";

export interface Sale extends Document {
  name: string;
  number: string;
  address: string;
  invoiceDate: Date;
  saleId: number;

  itemName: string;
  qty: number;
  unit: string;
  priceUnitTax: string;
  price: number;

  saletax: {
    tax: number;
    taxable: number;
  };
  amount: number;
  row: string[];
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
    price: {
      type: Number,
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
      taxable: {
        type: Number,
        required: false,
      },
    },
    amount: {
      type: Number,
      required: false,
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
