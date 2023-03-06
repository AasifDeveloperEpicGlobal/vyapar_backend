import mongoose, { model, Schema } from "mongoose";
import saleCounter from "./saleCounters";

type discount = {
  discount_tax: string;
  discount_amount: string;
};

type tax = {
  tax: string;
  taxable_amount: string;
};

export interface SaleSchema extends Document {
  name: string;
  mobile: string;
  address: string;
  invoiceDate: string;
  gstNumber: string;
  state: string;
  createdBy: any;
  saleId: number;

  billing: any;

  saleRow: {
    row: [
      {
        itemName: string;
        qty: number;
        unit: string;
        price: number;
        saletax: tax;
        discount: discount;
        amount: string;
      }
    ];
  };
  totalAmount: string;
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
    gstNumber: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    createdBy: { ref: "users", type: mongoose.Types.ObjectId },
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
              type: String,
              required: false,
            },
            taxable_amount: {
              type: String,
              required: false,
            },
          },
          discount: {
            discount_tax: {
              type: String,
              required: false,
            },
            discount_amount: {
              type: String,
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
    totalAmount: {
      type: String,
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
