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
      validate: {
        validator: function (v: any) {
          var re = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "Provided gstin number is invalid.",
      },
    },
    gst: {
      type: String,
      required: true,
      validate: {
        validator: function (v: any) {
          var re = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "Provided gstin number is invalid.",
      },
    },
    unregisteredcustomer: [
      {
        type: String,
        required: false,
      },
    ],
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("parties", partySchema);
