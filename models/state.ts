import { model, Schema } from "mongoose";

export interface IState extends Document {
  key: string;
  name: string;
}

const stateSchema = new Schema<IState>({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IState>("state", stateSchema);
