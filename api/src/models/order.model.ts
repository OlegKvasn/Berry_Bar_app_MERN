import { Schema, model, InferSchemaType } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: {
        city: String,
        street: String,
        apartment: String,
        portal: String,
      },
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
    deliveryTime: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: "created",
      enum: [
        "created",
        "confirmed",
        "preparing",
        "delivering",
        "completed",
        "canceled",
      ],
    },
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof OrderSchema>;

export default model<Order>("Order", OrderSchema);
