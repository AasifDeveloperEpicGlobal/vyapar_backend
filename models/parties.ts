import { model, Schema } from "mongoose";

export interface PartySchema extends Document {
  name: string;
  gstin: string;
  mobile: string;
  unregisteredcustomer: string;
  state: [
    {
      _id: string;
    }
  ];
  email: string;
  address: string;
}

const partySchema = new Schema<PartySchema>(
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
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (v: any) {
          var re = /^\d{10}$/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "Provided phone number is invalid.",
      },
    },
    unregisteredcustomer: [
      {
        type: String,
        required: false,
      },
    ],
    state: [
      {
        type: Schema.Types.ObjectId,
        ref: "states",
      },
    ],
    email: {
      type: String,
      required: true,
      validate: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      unique: true,
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

export default model<PartySchema>("parties", partySchema);
