import { Schema, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof ProductSchema>;

export default model<Product>("Product", ProductSchema);
