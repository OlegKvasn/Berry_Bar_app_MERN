import createHttpError from "http-errors";
import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    favorite: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (
  username: string,
  email: string,
  password: string
) {
  if (!username || !email || !password) {
    throw createHttpError(400, "User must have a username, email and password");
  }
};

export type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);
