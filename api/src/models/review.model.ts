import { Schema, model, InferSchemaType } from "mongoose";

const ReviewSchema = new Schema(
  {
    ReviewId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export type Review = InferSchemaType<typeof ReviewSchema>;

export default model<Review>("Review", ReviewSchema);
