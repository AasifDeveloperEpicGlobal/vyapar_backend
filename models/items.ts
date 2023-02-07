import { model, Schema } from "mongoose";

export interface Items extends Document {
  name: string;
  code: string;
  avatar: string;
  unit: string;
  hsn: number;

  saleAmount: number;
  saleTaxAmount: string;
  discOnSaleAmount: number;
  percentage: number;

  purchaseAmount: number;
  purchaseTaxAmount: number;
  noneTax: number;
}

const userSchema = new Schema<Items>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: false,
    },
    hsn: [
      {
        type: Schema.Types.ObjectId,
        ref: "hsns",
        unique: true,
        required: true,
      },
    ],
    saleAmount: {
      type: Number,
      required: true,
    },
    saleTaxAmount: {
      type: String,
      required: true,
    },
    purchaseAmount: {
      type: Number,
      required: false,
    },
    purchaseTaxAmount: {
      type: Number,
      required: false,
    },
    discOnSaleAmount: {
      type: Number,
      required: false,
    },
    percentage: {
      type: Number,
      required: false,
    },
    noneTax: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Items>("items", userSchema);
