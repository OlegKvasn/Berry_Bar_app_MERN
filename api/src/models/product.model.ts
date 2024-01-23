import { Schema, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title_en: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    desc_en: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    ingredients_en: {
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
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
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
    favorite: {
      type: Number,
      default: 0,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isNewIncome: {
      type: Boolean,
      default: false,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof ProductSchema>;

export default model<Product>("Product", ProductSchema);
