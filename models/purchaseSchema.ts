import { model, Schema } from "mongoose";
import purchaseCounter from "./purchaseCounters";
import saleCounter from "./saleCounters";

export interface PurchaseSchema extends Document {
  name: string;
  mobile: string;
  address: string;
  invoiceDate: string;
  purchaseId: number;

  billing: any;

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
    purchaseId: {
      type: Number,
      required: false,
    },
    billing: { type: Array, required: false },
    purchaseRow: {
      row: [
        {
          itemName: { type: String, required: false },
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
