import { model, Schema } from "mongoose";

export interface Items extends Document {
  name: string;
  code: string;
  avatar: string;
  unit:string
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
    },
    avatar: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Items>("items", userSchema);
