import { model, Schema } from "mongoose";

const partySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    unregistercustomer: [
      {
        type: String,
        required: false,
      },
    ],
    state: [
      {
        type: String,
        required: false,
      },
    ],
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("parties", partySchema);
