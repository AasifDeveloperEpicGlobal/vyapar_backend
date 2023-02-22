import { model, Schema } from "mongoose";
import saleCounter from "./saleCounters";

export interface SaleSchema extends Document {
  name: string;
  mobile: string;
  address: string;
  invoiceDate: string;
  saleId: number;

  billing: any;

  saleRow: {
    row: [
      {
        itemName: string;
        qty: number;
        unit: string;
        price: number;
        saletax: {
          tax: string;
          taxable_amount: string;
        };
        amount: string;
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
      required: false,
    },
    mobile: {
      type: String,
      required: false,
      unique: true,
    },
    invoiceDate: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    saleId: {
      type: Number,
      required: false,
    },
    billing: { type: Array, required: false },
    saleRow: {
      row: [
        {
          itemName: { type: String, required: false },
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
