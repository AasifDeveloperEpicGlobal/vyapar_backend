import { model, Schema } from "mongoose";
import saleCounter from "./saleCounters";

export interface SaleSchema extends Document {
  name: string;
  number: string;
  address: string;
  invoiceDate: Date;
  saleId: number;

  saleRow: {
    row: [
      {
        itemName: string;
        qty: number;
        unit: string;
        price: number;
        saletax: {
          tax: number;
          taxable_amount: number;
        };
        amount: number;
      }
    ];
  };

  paymentMode: string;
  description: string;
}

const saleSchema = new Schema<SaleSchema>(
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
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      required: true,
    },
    saleId: {
      type: Number,
      required: false,
    },
    saleRow: {
      row: [
        {
          itemName: { type: String, required: true },
          qty: { type: Number, required: false },
          unit: { type: String, required: false },
          price: { type: Number, required: false },
          saletax: {
            tax: {
              type: Number,
              required: false,
            },
            taxable_amount: {
              type: Number,
              required: false,
            },
          },
          amount: {
            type: Number,
            required: false,
          },
        },
      ],
    },
    paymentMode: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
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

export default model<SaleSchema>("saleSchema", saleSchema);
