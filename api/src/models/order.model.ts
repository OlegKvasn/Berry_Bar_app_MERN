import { Schema, model, InferSchemaType } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          productId: String,
          productImage: String,
          productName: String,
          productPrice: Number,
          quantity: Number,
        },
      ],
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
    paymentMethod: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "created",
      enum: ["created", "confirmed", "completed"],
    },
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof OrderSchema>;

export default model<Order>("Order", OrderSchema);
