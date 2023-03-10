import mongoose, { model, Schema } from "mongoose";
import purchaseCounter from "./purchaseCounters";
type discount = {
  discount_tax: string;
  discount_amount: string;
};

type tax = {
  tax: string;
  taxable_amount: string;
};

export interface PurchaseSchema extends Document {
  name: string;
  mobile: string;
  address: string;
  invoiceDate: string;
  gstNumber: string;
  state: string;
  createdBy: any;
  purchaseId: number;

  billing: any;

  purchaseRow: {
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
