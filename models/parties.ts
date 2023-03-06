import mongoose, { model, Schema } from "mongoose";

const partySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gst: {
      type: String,
      required: true,
      validate: {
        validator: function (value: any) {
          var re = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
          return !value || !value.trim().length || re.test(value);
        },
        message: "Provided Gst number is invalid.",
      },
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (value: any) {
          var mobile =
            /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
          return !value || !value.trim().length || mobile.test(value);
        },
        message: "Provided Mobile number is invalid.",
      },
    },
    pan: {
      type: String,
      required: true,
      validate: {
        validator: function (value: any) {
          var pan = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
          return !value || !value.trim().length || pan.test(value);
        },
        message: "Provided Pan number is invalid",
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
      validate: {
        validator: function (value: any) {
          var email =
            /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return !value || !value.trim().length || email.test(value);
        },
        message: "Provided email number is invalid",
      },
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    createdBy: { ref: "users", type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export default model("parties", partySchema);
