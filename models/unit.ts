import { model, Schema } from "mongoose";

export interface IUnit extends Document {
  key: string;
  name: string;
}

const unitSchema = new Schema<IUnit>({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IUnit>("unit", unitSchema);
