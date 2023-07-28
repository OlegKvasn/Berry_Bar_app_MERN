import { Schema, model, InferSchemaType } from "mongoose";

const OrderSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof OrderSchema>;

export default model<Order>("Order", OrderSchema);
