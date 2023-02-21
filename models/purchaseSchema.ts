import { model, Schema } from "mongoose";
import purchaseCounter from "./purchaseCounters";
import saleCounter from "./saleCounters";

export interface PurchaseSchema extends Document {
  name: string;
  number: string;
  address: string;
  invoiceDate: Date;
  purchaseId: number;

  purchaseRow: {
    row: [
      {
        itemName: string;
        qty: number;
        unit: string;
        price: number;
        purchasetax: {
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

const purchaseSchema = new Schema<PurchaseSchema>(
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
    purchaseId: {
      type: Number,
      required: false,
    },
    purchaseRow: {
      row: [
        {
          itemName: { type: String, required: true },
          qty: { type: Number, required: false },
          unit: { type: String, required: false },
          price: { type: Number, required: false },
          purchasetax: {
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

purchaseSchema.pre("save", function (next) {
  purchaseCounter.findByIdAndUpdate(
    { _id: "purchaseId" },
    { $inc: { purchaseBillSeq: 1 } },
    { new: true, upsert: true },
    (err, counter) => {
      if (err) {
        return next(err);
      }
      this.purchaseId = counter.purchaseBillSeq;
      next();
    }
  );
});

export default model<PurchaseSchema>("purchaseSchema", purchaseSchema);
