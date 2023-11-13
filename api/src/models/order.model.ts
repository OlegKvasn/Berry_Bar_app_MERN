import { Schema, model, InferSchemaType } from "mongoose";
import ProductModel from "../models/product.model";

const OrderSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: {
      type: [{ ProductModel, quantity: Number }],
      required: true,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    payment_intent: {
      type: String,
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
