import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";

interface Accessories extends Document {
  code: string;
  image: string;
  name: string;
  unit: string;
  hsn: string;

  saleAmount: string;
  saleTax: string;
  discOnSaleAmount: number;
  percentage: string;

  purchaseAmount: string;
  purchaseTaxAmount: string;
  noneTax: string;
  createdBy: any;
}

const accessoriesIconSchema = new Schema<Accessories>(
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
    image: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    // otherwise same rakhna hai hsn ko unit ke jaise..
    hsn: {
      type: String,
      required: false,
      unique: true,
    },
    saleAmount: {
      type: String,
      required: true,
    },
    saleTax: {
      type: String,
      required: false,
      default: "Without Tax",
    },
    purchaseAmount: {
      type: String,
      required: false,
    },
    purchaseTaxAmount: {
      type: String,
      required: false,
    },
    discOnSaleAmount: {
      type: Number,
      required: false,
    },
    percentage: {
      type: String,
      required: false,
    },
    noneTax: {
      type: String,
      required: false,
    },
    createdBy: { ref: "users", type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export default model<Accessories>("accessoriesItems", accessoriesIconSchema);
