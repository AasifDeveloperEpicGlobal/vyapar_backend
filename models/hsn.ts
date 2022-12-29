import { model, Model, Schema } from "mongoose";

export interface HsnData extends Document {
  hsn: number;
  description: string;
}

const hsnSchema = new Schema<HsnData>({
  hsn: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model<HsnData>("hsn", hsnSchema);
