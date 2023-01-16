import { model, Schema } from "mongoose";

export interface Request extends Document {
    mobile: string;
}

const requestSchema = new Schema<Request>({
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
});

export default model<Request>("request", requestSchema);