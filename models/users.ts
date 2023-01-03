import { model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  company: string;
  role: string;
  isRegistered: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  isRegistered: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default model<IUser>("users", userSchema);
